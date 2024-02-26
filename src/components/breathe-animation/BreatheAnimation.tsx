import { CSSProperties, FC, useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";

const BreatheAnimation: FC<{
  animationPlayState?: "running" | "paused";
}> = ({ animationPlayState = "paused" }) => {
  const [styleObj, setStyleObj] = useState<CSSProperties>({
    animationPlayState: "paused",
  });

  const handleAnimationStop = () => {
    setStyleObj({ animationPlayState: "paused" });
  };

  useEffect(() => {
    if (animationPlayState === "running")
      setStyleObj({ animationPlayState: "running" });
  }, [animationPlayState]);

  return (
    <div
      className={styles["watch-face"]}
      style={styleObj}
      {...(animationPlayState === "paused"
        ? { onAnimationIteration: handleAnimationStop }
        : {})}
    >
      <div className={styles["circle"]} style={styleObj}></div>
      <div className={styles["circle"]} style={styleObj}></div>
      <div className={styles["circle"]} style={styleObj}></div>
      <div className={styles["circle"]} style={styleObj}></div>
      <div className={styles["circle"]} style={styleObj}></div>
      <div className={styles["circle"]} style={styleObj}></div>
    </div>
  );
};

export default BreatheAnimation;
