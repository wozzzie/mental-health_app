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

  const getZodiacSignFromServer = async () => {};

  const postZodiacSign = (sign: ZodiacSign) => {};

  const updateZodiacSign = (option: string) => {
    const sign = option as ZodiacSign;
    setZodiacSign(sign);
    postZodiacSign(sign);
  };

  useEffect(() => {
    getZodiacSignFromServer();
  }, []);

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
