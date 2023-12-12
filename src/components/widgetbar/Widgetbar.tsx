import Image from "next/image";

import styles from "./style.module.scss";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import { useDispatch } from "react-redux";
import {
  openWidget,
  toggleWidget,
  toggleWallpaperWindow,
} from "../screen/ScreenSlice";
import { useState, useMemo, FC, useRef, useEffect } from "react";

type WidgetButton = {
  img: {
    src: string;
    alt: string;
  };
  action: () => void;
  key: any;
  active: boolean;
};

type Props = {
  buttons: WidgetButton[];
};

const Widgetbar: FC<Props> = ({ buttons }) => {
  const dispatch = useDispatch();
  const [wrapperActive, setWrapperActive] = useState<boolean>(true);

  const [overflow, setOverflow] = useState<boolean>(false);

  const disableTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleButtonMouseOver = () => {
    if (disableTimeout.current !== null) clearTimeout(disableTimeout.current);
    if (wrapperActive) setOverflow(true);
  };

  const handleButtonMouseOut = () => {
    disableTimeout.current = setTimeout(() => {
      setOverflow(false);
      disableTimeout.current = null;
      console.log("time");
    }, 500);
  };

  const wrapperClasses = useMemo(
    () =>
      styles["widget"] +
      (wrapperActive ? " " + styles["widget_active"] : "") +
      (overflow ? " " + styles["widget_visible"] : ""),
    [wrapperActive, overflow]
  );

  const handleToggleWrapperActive = () => {
    if (wrapperActive) {
      setOverflow(false);
      setWrapperActive(false);
    } else {
      setWrapperActive(true);
    }
  };

  return (
    <WidgetWrapper className={wrapperClasses}>
      <div
        className={styles["widget__menu"]}
        onClick={handleToggleWrapperActive}
      >
        <Image
          src="/burger-menu.svg"
          width={18}
          height={12}
          alt="Burger menu"
        />
      </div>
      <div className={styles["widget__block_main"]}>
        <div className={styles["widget__block_main_in"]}>
          {/* <div
          className={styles["widget__gallery"]}
          onClick={() => dispatch(toggleWallpaperWindow())}
        >
          <Image
            src="/wallpaper.svg"
            width={24}
            height={24}
            alt="Backgrounds gallery"
          />
        </div>
        <div
          className={styles["widget__music"]}
          onClick={() => dispatch(toggleWidget("music"))}
        >
          <Image src="/music.svg" width={24} height={24} alt="Play" />
        </div>
        <div className={styles["widget__breath"]}>
          <Image src="/breath.svg" width={24} height={24} alt="Breath" />
        </div>
        <div
          className={styles["widget__quotes"]}
          onClick={() => dispatch(toggleWidget("quote"))}
        >
          <Image src="/quotes.svg" width={24} height={24} alt="Quotes" />
        </div>
        <div
          className={styles["widget__meditation"]}
          onClick={() => dispatch(toggleWidget("meditation"))}
        >
          <Image
            src="/meditation.svg"
            width={24}
            height={24}
            alt="Meditation"
          />
        </div>
        <div
          className={styles["widget__news"]}
          onClick={() => dispatch(toggleWidget("news"))}
        >
          <Image src="/news.svg" width={24} height={24} alt="News" />
        </div>
      </div>
      <div className={styles["widget__block_additional"]}>
        <div
          className={styles["widget__gif"]}
          onClick={() => dispatch(toggleWidget("gif"))}
        >
          <Image
            src="/gif-widget.svg"
            width={24}
            height={24}
            alt="Gif widget"
          />
        </div>
        <div className={styles["widget__settings"]}>
          <Image src="/settings.svg" width={19.49} height={20} alt="Settings" />
        </div> */}
          {buttons.map((i: WidgetButton) => (
            <div
              key={i.key}
              onClick={i.action}
              className={
                styles["widget-button"] +
                (i.active ? " " + styles["widget-button_active"] : "")
              }
              onMouseOver={() => (!i.active ? handleButtonMouseOver() : null)}
              onMouseOut={handleButtonMouseOut}
            >
              <Image
                src={i.img.src}
                alt={i.img.alt}
                width={24}
                height={24}
                title={i.img.alt}
              />
              <div
                className={styles["widget-button__title"]}
                style={
                  i.active
                    ? {
                        opacity: 0,
                        visibility: "hidden",
                        transition: "none",
                      }
                    : {}
                }
              >
                {i.img.alt}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </WidgetWrapper>
  );
};

export default Widgetbar;
