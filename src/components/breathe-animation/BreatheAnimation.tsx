import { FC } from "react";
import styles from "./style.module.scss";

const BreatheAnimation: FC<{}> = () => {
  return (
    <div className={styles["watch-face"]}>
      <div className={styles["circle"]}></div>
      <div className={styles["circle"]}></div>
      <div className={styles["circle"]}></div>
      <div className={styles["circle"]}></div>
      <div className={styles["circle"]}></div>
      <div className={styles["circle"]}></div>
    </div>
  );
};

export default BreatheAnimation;
