import { useTranslation } from "next-i18next";
import classes from "./style.module.scss";
import Image from "next/image";
import PageContainer from "../page-container/pageContainer";
import LandingButton from "../landing-button/LandingButton";
import ROUTES from "../../constants/routes";
import { useAuth } from "../auth/authProvider";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Home = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();

  const handleSignUp = () => {
    router.push(ROUTES.SIGN_UP);
  };

  const handlePushToApp = () => {
    router.push(ROUTES.APP);
  };

  return (
    <>
      <header className={classes["main-header"]} id="home">
        <PageContainer flex classes={classes["container"]}>
          <div className={classes["main-header-text"]}>
            <h1 className={classes["main-header-text__title"]}>
              {t("home.title")}
            </h1>
            <div className={classes["main-header-text__description"]}>
              {t("home.subtitle")}
            </div>
            <div className={classes["main-header-text__explore-btn"]}>
              <LandingButton
                text={t("home.explore")}
                fullwidth
                onClick={user ? handlePushToApp : handleSignUp}
              />
            </div>
          </div>
          <Image
            src="/home.svg"
            alt="rectangle"
            className={classes["main-header__img"]}
            width={370}
            height={370}
          />
        </PageContainer>
      </header>
    </>
  );
};

export default Home;
