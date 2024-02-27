import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import serverURL from "@/constants/serverURL";
import Skeleton from "../skeleton/Skeleton";
import { QuotesData } from "@/types/types";

import styles from "./style.module.scss";

const QuotesWidget: React.FC = () => {
  const [data, seData] = useState<QuotesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [defaultQuote, setDefaultQuote] = useState("");
  const [defaultAuthor, setDefaultAuthor] = useState("");

  const router = useRouter();
  const { locale: activeLocale } = router;

  const showDefaultQuote = (lang: string) => {
    if (lang === "en") {
      setDefaultQuote("The best way to predict the future is to invent it.");
      setDefaultAuthor("Alan Kay");
    } else {
      setDefaultQuote(
        "У всего есть своя красота, но не каждый может ее увидеть."
      );
      setDefaultAuthor("Конфуций");
    }
  };

  const fetchRandomQuote = async (): Promise<void> => {
    const languageCode = activeLocale === "en" ? "en" : "ru";
    const url = `https://quotes15.p.rapidapi.com/quotes/random/?language_code=${languageCode}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "36f58699c2msh36ce2982596e66dp1d84a8jsn2d8d6e888c1f",
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();

        const englishSensitiveWords = [
          "war",
          "religion",
          "suicide",
          "violence",
          "politics",
        ];
        const russianSensitiveWords = [
          "война",
          "религия",
          "самоубийство",
          "насилие",
          "политика",
          "судимость",
          "господь",
          "грех",
          "кара",
          "бог",
          "проклятье",
          "смерть",
        ];

        const authorName = ["Гитлер", "Жириновский", "Талиб"];

        const containsSensitiveWord = data.tags.some(
          (tag: string) =>
            englishSensitiveWords.includes(tag.toLowerCase()) ||
            russianSensitiveWords.includes(tag.toLowerCase())
        );

        const containsSensitiveAuthor = authorName.some((author) =>
          data.originator.name.toLowerCase().includes(author.toLowerCase())
        );

        if (containsSensitiveWord || containsSensitiveAuthor) {
          return showDefaultQuote(languageCode);
        } else {
          seData(data);
          // saveQuoteToServer(data.content);
        }
      } else {
        console.error("Failed to fetch quote");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveQuoteToServer = async (quote: string) => {
    try {
      const quoteData = { content: quote };
      const response = await fetch(`${serverURL}/api/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      if (response.status === 201) {
      } else {
        console.error("Failed to save quote to the server");
      }
    } catch (error) {
      console.error("Error while saving quote to the server:", error);
    }
  };

  const getQuote = async () => {
    setLoading(true);
    await fetchRandomQuote();
    setLoading(false);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <WidgetWrapper className={styles["quotes__wrapper"]}>
      {loading ? (
        <div className={styles["quotes__skeleton"]}>
          <Skeleton className={styles["quotes__skeleton_content"]} />
          <Skeleton className={styles["quotes__skeleton_author"]} />
        </div>
      ) : (
        <>
          &ldquo;{data?.content || defaultQuote}&ldquo;
          <div className={styles["quotes__author"]}>
            {data?.originator.name || defaultAuthor}
          </div>
        </>
      )}
    </WidgetWrapper>
  );
};

export default QuotesWidget;
