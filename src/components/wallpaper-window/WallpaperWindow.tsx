import styles from "./style.module.scss";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import React from "react";

type Props = {
  children?: React.ReactNode[] | React.ReactNode;
  transitionState: string;
};

const WallpaperWindow: React.FC<Props> = ({ children, transitionState: s }) => {
  const windowStyles =
    styles["wallpaper-window"] +
    " " +
    (s === "exited" || s === "exiting" ? styles["wallpaper-window_exit"] : "");
  return (
    <div className={windowStyles}>
      <WidgetWrapper className={styles["widget-wrapper"]}>
        {children}
      </WidgetWrapper>
    </div>
  );
};

export default WallpaperWindow;
