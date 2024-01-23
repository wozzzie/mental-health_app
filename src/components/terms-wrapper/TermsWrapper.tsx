import PageContainer from "../page-container/pageContainer";
import PolicyText from "../policy-text/PolicyText";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import { PolicyParagraph } from "../policy-text/PolicyText";

const TermsWrapper = () => {
  const UPDATE_DATE = "01.11.2023";
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className={styles["policy"]}>
        <h1 className={styles["policy-title"]}>{t("terms.title")}</h1>
        <div className={styles["policy-update-date"]}>
          {t("policy.date")} <span>{UPDATE_DATE}</span>
        </div>
        <PolicyText
          paragraph={
            t("terms.paragraphs", { returnObjects: true }) as PolicyParagraph[]
          }
        />
      </div>
    </PageContainer>
  );
};

export default TermsWrapper;
