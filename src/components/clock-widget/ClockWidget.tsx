import useClock from "@/hooks/clock.hook";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import { useAuth } from "../auth/authProvider";
import { useClockSettings } from "../settings/settingsProvider";

const ClockWidget = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { use24HourFormat, showSeconds } = useClockSettings();

  const { time, date, PMOrAM } = useClock({
    use24HourFormat,
    showSeconds,
  });

  const userName: string = user?.displayName as string;

  return (
    <WidgetWrapper>
      <div className={styles["clock"]}>
        <div className={styles["clock__left"]}>
          <div className={styles["clock__greeting"]}>
            {t("clock.greeting")} {userName}!
          </div>
          <div className={styles["clock__date"]}>{date}</div>
        </div>
        <div className={styles["clock__right"]}>
          <div className={styles["clock__time"]}>
            <div
              className={
                styles["clock__numbers"] +
                (showSeconds ? " " + styles["clock__numbers_long"] : "")
              }
            >
              {time || "00:00" + (showSeconds && ":00")}
            </div>
            {!use24HourFormat && (
              <div className={styles["clock__daypart"]}>{PMOrAM}</div>
            )}
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
};

export default ClockWidget;
