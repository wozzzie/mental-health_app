import PageContainer from "../page-container/pageContainer";
import PolicyText from "../policy-text/PolicyText";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";

const PolicyWrapper = () => {
  const UPDATE_DATE = "01.11.2023";
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className={styles["policy"]}>
        <h1 className={styles["policy-title"]}>{t("policy.title")}</h1>
        <div className={styles["policy-update-date"]}>
          {t("policy.date")} <span>{UPDATE_DATE}</span>
        </div>
        <PolicyText />
      </div>
    </PageContainer>
  );
};

export default PolicyWrapper;
