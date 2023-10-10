import nookies from "nookies";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SyntheticEvent, useEffect, useState } from "react";
import Router from "next/router";
import Header from "../../components/header/Header";
import PageContainer from "../../components/page-container/pageContainer";
import { firebaseAdmin } from "@/firebase/firebaseAdmin";
import ROUTES from "@/constants/routes";

import styles from "./style.module.scss";
import React from "react";

import { logout } from "@/firebase/firebaseClient";

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
      <Header />
      <PageContainer>
        <div className={styles.app}>
          <div className={styles["app__sidebar"]}></div>
        </div>
      </PageContainer>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, exp } = token;

    const locale = ctx.locale || "en";

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
