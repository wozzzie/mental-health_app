import { useTranslation } from "next-i18next";
import styles from "./style.module.scss";
import PageContainer from "../page-container/pageContainer";

const PolicyText = () => {
  const UPDATE_DATE = "01.11.2023";

  const { t } = useTranslation();

  interface PolicyParagraph {
    title: string;
    text: string[];
  }

  return (
    <PageContainer>
      <div className={styles["policy"]}>
        <h1 className={styles["policy-title"]}>{t("policy.title")}</h1>
        <div className={styles["policy-update-date"]}>
          {t("policy.date")} <span>{UPDATE_DATE}</span>
        </div>
        <ul className={styles["policy-paragraphs"]}>
          {(
            t("policy.paragraphs", { returnObjects: true }) as PolicyParagraph[]
          ).map(({ title, text }, i) => {
            return (
              <li key={i} className={styles["policy-paragraphs-item"]}>
                <h2 className={styles["policy-paragraphs-item__title"]}>
                  {title}
                </h2>
                <ul>
                  {text.map((item, i) => (
                    <li
                      key={i}
                      className={styles["policy-paragraphs-item-text"]}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </PageContainer>
  );
};

export default PolicyText;
