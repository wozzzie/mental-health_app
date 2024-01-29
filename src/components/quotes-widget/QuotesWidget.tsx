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

  const router = useRouter();
  const { locale: activeLocale } = router;

  const fetchRandomQuote = async () => {
    const languageCode = activeLocale === "En" ? "en" : "ru";
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
        seData(data);
        saveQuoteToServer(data.content);
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
        console.log("Quote saved to the server successfully");
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
          &ldquo;{data?.content}&ldquo;
          <div className={styles["quotes__author"]}>
            {data?.originator.name}
          </div>
        </>
      )}
    </WidgetWrapper>
  );
};

export default QuotesWidget;
