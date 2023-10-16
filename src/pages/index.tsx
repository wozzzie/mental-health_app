import { useTranslation } from "next-i18next";
import PageContainer from "../components/page-container/pageContainer";
// import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";

import styles from "./style.module.scss";
import { ErrorBoundaryWithMessage } from "../components/error-boundary/errorBoundary";
import Button from "../components/button/Button";
import Home from "../components/home/Home"
import Meditation from "@/components/meditation/Meditation";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";

export default function WelcomePage() {
  const { t } = useTranslation();
  return (
    <>
      <ErrorBoundaryWithMessage>
        <Header />
      </ErrorBoundaryWithMessage>
      <ErrorBoundaryWithMessage>
        <Home/>
      </ErrorBoundaryWithMessage>
      <ErrorBoundaryWithMessage>
        <Meditation/>
      </ErrorBoundaryWithMessage>
      <ErrorBoundaryWithMessage>
        <Features/>
      </ErrorBoundaryWithMessage>
      <ErrorBoundaryWithMessage>
        <Footer/>
      </ErrorBoundaryWithMessage>
      {/* <PageContainer>
        <div className={styles.welcome}>
          <picture>
            <img
              src="/bg.png"
              alt="mental-health"
              className={styles["welcome__bg"]}
            ></img>
          </picture>
          <div className={styles["welcome__wrapper"]}>
            <h1 className={styles["welcome__title"]}>{t("welcome.title")}</h1>
            <p className={styles["welcome__subtitle"]}>
              {t("welcome.subtitle")}
            </p>
            <Button type="button" text={t("btn.btn-start")} />
          </div>
        </div>
      </PageContainer> */}
      {/* <Footer /> */}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locale } = context;
  const currentLocale = locale || "defaultLocale";

  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["common"])),
    },
  };
};
