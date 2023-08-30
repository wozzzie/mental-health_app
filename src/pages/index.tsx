import { useTranslation } from "next-i18next";
import PageContainer from "../components/page-container/pageContainer";
// import Footer from "../components/footer/Footer";
// import Header from "../components/header/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";

import styles from "./style.module.scss";
import { ErrorBoundaryWithMessage } from "../components/error-boundary/errorBoundary";

export default function WelcomePage() {
  const { t } = useTranslation();

  return (
    <>
      {/* <ErrorBoundaryWithMessage>
        <Header />
      </ErrorBoundaryWithMessage> */}

      <PageContainer>
        <div className={styles.welcome}>
          {/* <div className={styles["welcome__bg"]}></div> */}
          <div className={styles["welcome__wrapper"]}>
            <h1 className={styles["welcome__title"]}>{t("welcome.title")}</h1>
            <p className={styles["welcome__subtitle"]}>
              {t("welcome.subtitle")}
            </p>
          </div>
        </div>
      </PageContainer>
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
