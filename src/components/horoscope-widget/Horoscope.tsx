import React, { useEffect, useState } from "react";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import Image from "next/image";
import { ZodiacSignData } from "@/types/types";
import ChooseSignWindow from "./ChooseSignWindow";
import { useAuth } from "../auth/authProvider";
import serverURL from "@/constants/serverURL";

import styles from "./style.module.scss";
import SmoothResizeBlock from "../smooth-resize-block/SmoothResizeBlock";

const HoroscopeWidget: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);
  const [zodiacSigns, setZodiacSigns] = useState<string[]>([]);
  const [data, setData] = useState<ZodiacSignData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userSelected, setUserSelected] = useState<boolean>(false);
  const [initialRender, setInitialRender] = useState<boolean>(true);

  const { user } = useAuth();
  const userUid = user?.uid;

  const checkUserSign = async () => {
    try {
      const response = await fetch(
        `${serverURL}/api/horoscope/check-user-sign?uid=${userUid}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to check user sign");
      }

      const data = await response.json();
      if (data.success && data.hasChosenSign) {
        setUserSelected(true);
        await fetchHoroscope();
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error checking user sign:", error.message);
    }
  };

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

      const responseData = await response.json();
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
    setLoading(true);
    await saveZodiacSign(inputValue);
    setSelectedZodiac(inputValue);
    setInitialRender(false);
    await getHoroscope();
    setLoading(false);
  };

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

    checkUserSign();
  }, []);

  const fetchHoroscope = async () => {
    setLoading(true);
    await getHoroscope();
    setLoading(false);
  };

  return (
    <WidgetWrapper className={styles["widget__wrapper"]}>
      <SmoothResizeBlock
        classNames={
          !(selectedZodiac || userSelected || loading)
            ? styles["horoscope_smooth"]
            : styles["horoscope_hidden"]
        }
      >
        {selectedZodiac || userSelected || loading ? (
          <>
            {loading ? (
              <div className={styles["horoscope__loading"]}>
                <span>Loading...</span>
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
        ) : (
          <>
            {initialRender && (
              <ChooseSignWindow
                options={zodiacSigns}
                inputValue={inputValue}
                handleZodiacChange={handleZodiacChange}
                handleSaveClick={handleSaveClick}
                zodiacSigns={zodiacSigns}
              />
            )}
          </>
        )}
      </SmoothResizeBlock>
    </WidgetWrapper>
  );
};

export default HoroscopeWidget;
