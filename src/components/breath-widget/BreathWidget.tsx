import BreatheAnimation from "../breathe-animation/BreatheAnimation";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import styles from "./style.module.scss";

const BreathWidget = () => {
  return (
    <WidgetWrapper className={styles["breath-widget"]}>
      <BreatheAnimation />
    </WidgetWrapper>
  );
};

export default BreathWidget;
