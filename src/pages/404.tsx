import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PageContainer from "../components/page-container/pageContainer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Logo from "../../public/logo-animated.svg";

import styles from "./404.module.scss";

const ErrorPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className={styles.error}>
        <Logo className={styles["error__logo"]} />
        <h1 className={styles["error__title"]}>{t("404.title")}</h1>
      </div>
    </PageContainer>
  );
};

export default ErrorPage;

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
