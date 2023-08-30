import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
// import Button from "@/components/Button";
import PageContainer from "../components/page-container/pageContainer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";

import styles from "./404.module.scss";

const ErrorPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className={styles.error}>
        <picture className={styles["error__img"]}>
          <img src="/error.png" alt="error" />
        </picture>

        <div className={styles["error__block"]}>
          <h1 className={styles["error__title"]}>{t("404.oops")}</h1>
          <p className={styles["error__text"]}>{t("404.error")}</p>
          {/* <Button
            type="button"
            onClick={() => router.push("/")}
            text={t("404.btn-go-home")}
            iconProps={{ src: "/home.svg", alt: "home icon", size: 24 }}
          /> */}
        </div>
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
