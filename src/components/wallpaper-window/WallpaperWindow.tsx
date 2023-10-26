import styles from "./style.module.scss"
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import React from "react"

type Props = {
    children?: React.ReactNode[]
}

const WallpaperWindow = ({children}) => {

    return (
        <div className={styles["wallpaper-window"]}>
            <WidgetWrapper className={styles["widget-wrapper"]}>
                {children}
            </WidgetWrapper>
        </div>
    );
}

export default WallpaperWindow;