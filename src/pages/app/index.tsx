import React, { useEffect } from "react";
import nookies from "nookies";
import Router from "next/router";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { firebaseAdmin } from "../../firebase/firebaseAdmin";
import { logout } from "../../firebase/firebaseClient";
import ROUTES from "../../constants/routes";
import Widgetbar from "../../components/widgetbar/Widgetbar";
import Screen from "../../components/screen/Screen";

import styles from "./style.module.scss";

const AppPage = ({
  exp: expTime,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {
    const handle = setInterval(async () => {
      const currTime = Math.floor(Date.now() / 1000);
      if (currTime > expTime) {
        logout();
        Router.push(ROUTES.WELCOME);
      }
    }, 60 * 1000);
    return () => clearInterval(handle);
  }, [expTime]);

  return (
    <>
      <style global jsx>{`
        html,
        body {
          overflow: hidden;
        }
      `}</style>
      <div className={styles["app"]}>
        <Screen>
          <Widgetbar />
        </Screen>
      </div>
    </>
    
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, exp } = token;

    const locale = ctx.locale || "En";

    return {
      props: {
        uid,
        exp,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.SIGN_IN,
      },
      props: {} as never,
    };
  }
};

export default AppPage;
