import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch } from "../../store/store";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";

import styles from "./style.module.scss";

const QuotesWidget: React.FC = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const dispatch: AppDispatch = useDispatch();
  const [quote, setQuote] = useState("");

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

        saveQuoteToServer(data.content);
        setQuote(data.content);
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
      const response = await fetch("http://localhost:3001/api/quotes", {
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

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <WidgetWrapper className={styles["widget__wrapper"]}>
      &ldquo;{quote}&ldquo;
    </WidgetWrapper>
  );
};

export default QuotesWidget;
