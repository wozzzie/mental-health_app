import { useTranslation } from "next-i18next";
import styles from "./style.module.scss";
import PageContainer from "../page-container/pageContainer";
import { FC, Fragment, useMemo } from "react";

type PolicyLink = {
  src: string;
  text: string;
};

type TextWithLink = (string | PolicyLink)[];

export interface PolicyParagraph {
  title: string;
  text: (string | PolicyParagraph | TextWithLink)[];
}

interface Props {
  paragraph?: PolicyParagraph[];
}

const isPolicyParagraph = (a: any) => {
  return typeof a?.title === "string";
};

const isTextWithLink = (a: any) => {
  return Array.isArray(a);
};

const isPolicyLink = (a: any) => {
  return typeof a?.src === "string";
};

const isString = (a: any) => {
  return typeof a === "string";
};

const PolicyText: FC<Props> = ({ paragraph = null }) => {
  const { t } = useTranslation();

  const paragraphs = useMemo(
    () =>
      paragraph
        ? paragraph
        : (t("policy.paragraphs", {
            returnObjects: true,
          }) as PolicyParagraph[]),
    [paragraph]
  );

  return (
    <ul className={styles["policy-paragraphs"]}>
      {paragraphs.map(({ title, text }, i) => {
        return (
          <li
            key={title + i.toString()}
            className={styles["policy-paragraphs-item"]}
          >
            {title !== "" && (
              <h2 className={styles["policy-paragraphs-item__title"]}>
                {title}
              </h2>
            )}
            <ul>
              {text.map((item, i) => (
                <li
                  key={title + i.toString()}
                  className={styles["policy-paragraphs-item-text"]}
                >
                  {isString(item) ? (
                    (item as string)
                  ) : isTextWithLink(item) ? (
                    (item as TextWithLink).map((el) =>
                      isString(el) ? (
                        <Fragment key={el as string}>{el as string}</Fragment>
                      ) : isPolicyLink(el) ? (
                        <a
                          href={(el as PolicyLink).src}
                          key={(el as PolicyLink).text}
                        >
                          {(el as PolicyLink).text}
                        </a>
                      ) : (
                        <></>
                      )
                    )
                  ) : isPolicyParagraph(item) ? (
                    <PolicyText paragraph={[item as PolicyParagraph]} />
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default PolicyText;
