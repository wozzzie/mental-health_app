import Image from "next/image";

import styles from "./style.module.scss";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import { useDispatch } from "react-redux";
import { openWidget, toggleWidget, toggleWallpaperWindow } from "../screen/ScreenSlice";
import { useState, useMemo } from "react"


const Widgetbar = () => {

  const dispatch = useDispatch();

  const [wrapperActive, setWrapperActive] = useState<boolean>(true);

  const wrapperClasses =  useMemo(() => styles["widget"] + (wrapperActive ? " " + styles["widget_active"] : ""), [wrapperActive]);


  return (
    <WidgetWrapper className={wrapperClasses}>
      <div className={styles["widget__menu"]} onClick={()=>setWrapperActive(s => !s)}>
        <Image
          src="/burger-menu.svg"
          width={18}
          height={12}
          alt="Burger menu"
        />
      </div>
      <div className={styles["widget__block_main"]}>
        <div className={styles["widget__gallery"]} onClick={()=>dispatch(toggleWallpaperWindow())}>
          <Image
            src="/wallpaper.svg"
            width={24}
            height={24}
            alt="Backgrounds gallery"
          />
        </div>
        <div className={styles["widget__music"]} onClick={()=>dispatch(toggleWidget("music"))}>
          <Image src="/music.svg" width={24} height={24} alt="Play" />
        </div>
        <div className={styles["widget__breath"]}>
          <Image src="/breath.svg" width={24} height={24} alt="Breath" />
        </div>
        <div className={styles["widget__quotes"]} onClick={()=>dispatch(toggleWidget("quote"))}>
          <Image src="/quotes.svg" width={24} height={24} alt="Quotes" />
        </div>
        <div className={styles["widget__meditation"]} onClick={()=>dispatch(toggleWidget("meditation"))}>
          <Image
            src="/meditation.svg"
            width={24}
            height={24}
            alt="Meditation"
          />
        </div>
        <div className={styles["widget__news"]} onClick={()=>dispatch(toggleWidget("news"))}>
          <Image src="/news.svg" width={24} height={24} alt="News" />
        </div>
      </div>
      <div className={styles["widget__block_additional"]} >
        <div className={styles["widget__gif"]} onClick={()=>dispatch(toggleWidget("gif"))}>
          <Image
            src="/gif-widget.svg"
            width={24}
            height={24}
            alt="Gif widget"
          />
        </div>
        <div className={styles["widget__settings"]}>
          <Image src="/settings.svg" width={19.49} height={20} alt="Settings" />
        </div>
      </div>
    </WidgetWrapper>
  );
};

export default Widgetbar;
