import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import { closeWidget } from "../screen/ScreenSlice";

import styles from "./style.module.scss";
import { useRouter } from "next/router";

const QuotesWidget: React.FC = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const dispatch: AppDispatch = useDispatch();
  const [quote, setQuote] = useState("");
  const [isHovered, setIsHovered] = useState(false);

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
        console.log(data);
        setQuote(data.content);
      } else {
        console.error("Failed to fetch quote");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
    console.log("Component render method called.");
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClose = () => {
    dispatch(closeWidget("quote"));
  };

  return (
    <div
      className={`${styles["quote-widget"]} ${
        isHovered ? styles["quote-widget_hovered"] : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <WidgetWrapper>
        {isHovered && (
          <div className={styles["cross-widget"]} onClick={handleClose}>
            <Image
              src="/cross-icon.svg"
              width={18}
              height={12}
              alt="Close widget"
            />
          </div>
        )}
        &ldquo;{quote}&ldquo;
      </WidgetWrapper>
    </div>
  );
};

export default QuotesWidget;
