import { useTranslation } from "next-i18next";
import BreatheAnimation from "../breathe-animation/BreatheAnimation";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import styles from "./style.module.scss";
import useTimer from "@/hooks/timer.hook";
import AppButton from "../app-button/AppButton";
import { SwitchTransition, Transition } from "react-transition-group";

const BreathWidget = () => {
  const { t } = useTranslation();

  const switchTimeout = 300;

  const { stringTimer, setClockTimeout, hasTime } = useTimer();

  return (
    <WidgetWrapper className={styles["breath-widget"]}>
      <BreatheAnimation animationPlayState={hasTime ? "running" : "paused"} />

      <SwitchTransition>
        <Transition
          timeout={switchTimeout}
          key={`${hasTime}`}
          mountOnEnter
          unmountOnExit
        >
          {!hasTime
            ? (s) => (
                <div
                  className={styles["breath-widget__timer-choose"]}
                  style={{
                    opacity: s === "entering" || s === "entered" ? 1 : 0,
                    transition: `${switchTimeout}ms opacity`,
                  }}
                >
                  <div className={styles["breath-widget__timer-btn"]}>
                    <AppButton onClick={() => setClockTimeout(30)}>
                      0:30
                    </AppButton>
                  </div>
                  <div className={styles["breath-widget__timer-btn"]}>
                    <AppButton onClick={() => setClockTimeout(60)}>
                      1:00
                    </AppButton>
                  </div>
                  <div className={styles["breath-widget__timer-btn"]}>
                    <AppButton onClick={() => setClockTimeout(120)}>
                      2:00
                    </AppButton>
                  </div>
                </div>
              )
            : (s) => (
                <div
                  className={styles["breath-widget__timer-left"]}
                  style={{
                    opacity: s === "entering" || s === "entered" ? 1 : 0,
                    transition: `${switchTimeout}ms opacity`,
                  }}
                >
                  {stringTimer}
                </div>
              )}
        </Transition>
      </SwitchTransition>
    </WidgetWrapper>
  );
};

export default BreathWidget;
