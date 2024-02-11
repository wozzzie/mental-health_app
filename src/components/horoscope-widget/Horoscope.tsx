import React, { useEffect, useState } from "react";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import Image from "next/image";
import { ZodiacSignData } from "@/types/types";
import ChooseSignWindow from "./ChooseSignWindow";
import { useAuth } from "../auth/authProvider";
import serverURL from "@/constants/serverURL";
import Skeleton from "../skeleton/Skeleton";
import { useHoroscopeSettings } from "../settings/settingsProvider";

import styles from "./style.module.scss";

const HoroscopeWidget: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [zodiacSigns, setZodiacSigns] = useState<string[]>([]);
  const [data, setData] = useState<ZodiacSignData | null>(null);
  const { zodiacSign, status, updateZodiacSign } = useHoroscopeSettings();

  const { user } = useAuth();
  const userUid = user?.uid;

  const saveZodiacSign = async (sign: string) => {
    try {
      const signData = { sign, userUid };
      const response = await fetch(`${serverURL}/api/horoscope/zodiac-sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signData),
      });
    } catch (error: any) {
      console.error("Error saving zodiac sign:", error.message);
    }
  };

  const getHoroscope = async () => {
    try {
      const response = await fetch(
        `${serverURL}/api/horoscope/get-horoscope?uid=${userUid}`,
        { method: "GET" }
      );

      if (!response.ok && response.status !== 404) {
        throw new Error("Failed to fetch horoscope");
      }

      const data = await response.json();
      setData(data);
    } catch (error: any) {
      console.error("Error getting horoscope:", error.message);
    }
  };

  const handleZodiacChange = async (option: string) => {
    setInputValue(option);
  };

  const handleSaveClick = async () => {
    await saveZodiacSign(inputValue);
    updateZodiacSign(inputValue);
  };

  useEffect(() => {
    setData(null);
    if (zodiacSign) {
      getHoroscope();
    }
  }, [zodiacSign]);

  useEffect(() => {
    setZodiacSigns([
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ]);
  }, []);

  return (
    <WidgetWrapper className={styles["widget__wrapper"]}>
      <>
        {status === "pending" || status === "start" ? (
          <div className={styles["horoscope__skeleton"]}>
            <Skeleton className={styles["horoscope__skeleton_title"]} />
            <div className={styles["horoscope__divider"]}></div>
            <Skeleton className={styles["horoscope__skeleton_content"]} />
          </div>
        ) : zodiacSign === null ? (
          <ChooseSignWindow
            options={zodiacSigns}
            inputValue={inputValue}
            handleZodiacChange={handleZodiacChange}
            handleSaveClick={handleSaveClick}
          />
        ) : data === null ? (
          <div className={styles["horoscope__skeleton"]}>
            <Skeleton className={styles["horoscope__skeleton_title"]} />
            <div className={styles["horoscope__divider"]}></div>
            <Skeleton className={styles["horoscope__skeleton_content"]} />
          </div>
        ) : (
          <>
            <div className={styles["horoscope__block"]}>
              <Image
                src={data?.horoscope.icon as string}
                alt="zodiac sign"
                width={32}
                height={28}
              />
              <h1 className={styles["horoscope__title"]}>
                {data?.horoscope.sign}
              </h1>
            </div>
            <div className={styles["horoscope__divider"]}></div>
            <div className={styles["horoscope__text"]}>
              {data?.horoscope.horoscope}
            </div>
          </>
        )}
      </>
    </WidgetWrapper>
  );
};

export default HoroscopeWidget;
