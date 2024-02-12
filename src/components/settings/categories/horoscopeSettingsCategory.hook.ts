import { useAuth } from "@/components/auth/authProvider";
import serverURL from "@/constants/serverURL";
import { useEffect, useMemo, useState } from "react";
import { LoadingStatus, settingsGroup } from "../settingsProvider";

export type ZodiacSign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

const useHoroscopeSettingsCategory = () => {
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign | null>(null);
  const [status, setStatus] = useState<LoadingStatus>("start");

  const uid = useAuth().user?.uid;

  const getZodiacSignFromServer = async () => {
    try {
      setStatus("pending")

      const response = await fetch(
        `${serverURL}/api/horoscope/get-horoscope?uid=${uid}`,
        { method: "GET" }
      );
    
      if(response.ok || response.status === 404) {
        setStatus("fetched")
      } 

      const data = await response.json();
      console.log(data)
      if (data.success) {
        setZodiacSign(data.horoscope.sign)
      }

      if (!response.ok && response.status !== 404) {
        throw new Error("Failed to fetch horoscope");
      }

    } catch (error: any) {
      setStatus('error')
      console.log(error)
      console.error("Error getting horoscope:", error.message);
    }
  };

  const postZodiacSign = async (sign: ZodiacSign) => {
    try {
      const signData = { sign, userUid: uid};
      await fetch(`${serverURL}/api/horoscope/zodiac-sign`, {
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

  const updateZodiacSign = (option: string) => {
    const sign = option as ZodiacSign;
    setZodiacSign(sign);
    postZodiacSign(sign);
  };

  useEffect(() => {
    if(uid){
      getZodiacSignFromServer();
    }
  }, [uid]);

  const category = useMemo<settingsGroup>(
    () => ({
      name: "horoscope",
      settings: [
        {
          type: "select-form",
          name: "choose-zodiac-sign",
          selectedValue: zodiacSign,
          valueVariants: [
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
          ],
          callback: updateZodiacSign,
        },
      ],
    }),
    [uid, zodiacSign, status]
  );

  return {
    category,
    hook: {
      zodiacSign,
      status,
      updateZodiacSign,
    },
  };
};

export default useHoroscopeSettingsCategory;
