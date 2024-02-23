"use client";
import { FC, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { useGetNewsQuery } from "@/apis/news.api";
import { useAuth } from "../auth/authProvider";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import SmoothResizeBlock from "../smooth-resize-block/SmoothResizeBlock";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Skeleton from "./skeleton.svg";
import { useRouter } from "next/router";

const NewsWidget: FC<{}> = () => {
  const { locale } = useRouter();

  const { isSuccess, isError, isFetching, data, refetch } = useGetNewsQuery({
    lang: locale?.toLowerCase() as "en" | "ru" | "ua",
    limit: 3,
  });

  useEffect(() => {
    refetch();
  }, [locale]);
  const { t } = useTranslation();

  const trimTitle = (title: string) => {
    const maxLength = 80;
    return title.length > maxLength
      ? title.substring(0, maxLength - 3) + "..."
      : title;
  };

  return (
    <WidgetWrapper className={styles["news"]}>
      <SmoothResizeBlock classNames={styles["news__block"]}>
        <h2 className={styles["news__title"]}>{t("news.title")}</h2>
        {isSuccess && !isFetching ? (
          <div className={styles["news__list"]}>
            {data.map((item, i) => (
              <label
                key={item.title}
                className={styles["news__item"]}
                htmlFor={item.url}
              >
                <div className={styles["news__text__wrapper"]}>
                  <a
                    className={styles["news__text"]}
                    id={item.url}
                    href={item.url}
                  >
                    {trimTitle(item.title)}
                  </a>
                  <div className={styles["news__author"]}>
                    <img
                      src={item.authorLogo}
                      alt={item.author}
                      width={10}
                      height={10}
                      className={styles["news__author__logo"]}
                    />
                    <div className={styles["news__author__text"]}>
                      {item.author}
                    </div>
                  </div>
                </div>
                <div className={styles["news__img__wrapper"]}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={100}
                    height={100}
                    className={styles["news__img"]}
                  />
                </div>
              </label>
            ))}
          </div>
        ) : isError ? (
          "Error"
        ) : (
          <Skeleton />
        )}
      </SmoothResizeBlock>
    </WidgetWrapper>
  );
};

export default NewsWidget;
