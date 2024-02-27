import { useEffect, useMemo, useRef, useState } from "react";
import { get2charNumber } from "./clock.hook";

const useTimer = () => {
  const [time, setTime] = useState<Date | null>(null);

  const [endTime, setEndTime] = useState<Date | null>(null);

  const updateTime = () => {
    setTime(new Date());
  };

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    updateTime();
    intervalRef.current = setInterval(updateTime, 1000);
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const setClockTimeout = (seconds: number) => {
    const newDate = new Date(new Date().getTime() + seconds * 1000);
    setEndTime(newDate);
  };

  const hasTime = useMemo(() => {
    return endTime && time ? endTime?.getTime() > time?.getTime() : false;
  }, [time, endTime]);

  const stringTimer = useMemo(() => {
    if (!time || !endTime) {
      return "0:00";
    }
    const timeLeft = new Date(
      Math.max(0, endTime?.getTime() - time?.getTime())
    );
    return `${timeLeft.getMinutes()}:${get2charNumber(timeLeft.getSeconds())}`;
  }, [time, endTime]);

  return {
    stringTimer,
    setClockTimeout,
    hasTime,
  };
};

export default useTimer;
