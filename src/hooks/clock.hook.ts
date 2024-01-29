import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useRef, useState, useEffect, useMemo } from "react";

const get2charNumber = (n: number) => {
  return n < 10 ? "0" + n : n;
};

export interface configObj {
  use24HourFormat?: boolean;
  showSeconds?: boolean;
}

export type TimeObj = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type DateObj = {
  day: number;
  month: number;
  year: number;
};

type returnObj = {
  time: string;
  date: string;
  PMOrAM: string;
};

type useClockType = (a: configObj) => returnObj;

const useClock: useClockType = ({
  use24HourFormat = false,
  showSeconds = false,
}) => {
  const [time, setTime] = useState<TimeObj | null>(null);
  const [date, setDate] = useState<DateObj | null>(null);

  const { t } = useTranslation();
  const { locale } = useRouter();

  const curInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const updateDate = () => {
      const curDate = new Date();
      setTime({
        hours: curDate.getHours(),
        minutes: curDate.getMinutes(),
        seconds: curDate.getSeconds(),
      });
      setDate({
        day: curDate.getDate(),
        month: curDate.getMonth(),
        year: curDate.getFullYear(),
      });
    };
    updateDate();
    curInterval.current = setInterval(updateDate, 1000);
    return () => {
      if (curInterval.current) {
        clearInterval(curInterval.current);
      }
    };
  }, []);

  const months = useMemo<string[]>(
    () => t("clock.months", { returnObjects: true }) as string[],
    [t]
  );

  const stringTime = useMemo(
    () =>
      `${get2charNumber(
        use24HourFormat ? (time?.hours as number) : (time?.hours as number) % 12
      )}:${get2charNumber(time?.minutes as number)}` +
      (showSeconds ? `:${get2charNumber(time?.seconds as number)}` : ""),
    [use24HourFormat, showSeconds, time]
  );
  const stringDate = useMemo(
    () =>
      locale === "ru" || locale === "ua"
        ? `${date?.day} ${months[date?.month as number]} ${date?.year}`
        : `${months[date?.month as number]} ${date?.day}, ${date?.year}`,
    [date, locale]
  );
  const PMOrAM = useMemo(
    () => ((time?.hours as number) > 12 ? "am" : "pm"),
    [time]
  );
  return {
    time: stringTime,
    date: stringDate,
    PMOrAM,
  };
};

export default useClock;
