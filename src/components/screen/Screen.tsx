import { useLayoutEffect, useMemo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DraggableData, Rnd } from "react-rnd";
import Image from "next/image";
import { WidgetAbstraction, WidgetType, closeWidget } from "./ScreenSlice";
import { openWidget, raiseWidget, changeWidgetPosition } from "./ScreenSlice";
import QuotesWidget from "../quotes-widget/QuotesWidget";
import MusicWidget from "../music-widget/MusicWidget";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import WallpaperWindow from "../wallpaper-window/WallpaperWindow";
import GalleryWidget from "../gallery-widget/GalleryWidget";
import Tarot from "../tarot/Tarot";

import styles from "./style.module.scss";

const WidgetView: React.FC<WidgetAbstraction> = ({ x, y, type }) => {
  const dispatch = useDispatch();

  const savePosition = (type: WidgetType, d: DraggableData) => {
    dispatch(changeWidgetPosition({ type, x: d.x, y: d.y }));
  };

  const child = (
    <>
      {
        // сюда вставлять виджеты
        type === "gif" ? (
          <Tarot />
        ) : type === "meditation" ? (
          <>meditation</>
        ) : type === "music" ? (
          <>
            <MusicWidget />
          </>
        ) : type === "news" ? (
          <>news</>
        ) : type === "quote" ? (
          <>
            <QuotesWidget />
          </>
        ) : (
          <>default</>
        )
      }
    </>
  );

  return (
    <Rnd
      default={{
        x: x,
        y: y,
      }}
      bounds="parent"
      onDragStop={(e, d) => savePosition(type, d)}
      style={{
        overflow: "hidden",
      }}
      enableResizing={false}
    >
      <div
        className={styles["autofill-block"]}
        onMouseDown={() => dispatch(raiseWidget(type))}
      >
        <WidgetWrapper className={styles["widget-wrapper"]}>
          <div className={styles["widget-control"]}>
            <button onClick={() => dispatch(closeWidget(type))}>
              <Image src="/close.svg" alt="close" width={15} height={15} />
            </button>
          </div>
          {child}
        </WidgetWrapper>
      </div>
    </Rnd>
  );
};

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
};

const Screen: React.FC<ScreenProps> = ({ children, className }) => {
  const classes = [styles["screen"], className].join(" ");
  const widgets = useSelector((state: any) => state.screen.widgets);
  const wallpaper = useSelector((s: any) => s.screen.wallpaper);

  const wallpaperWindowActive = useSelector(
    (s) => s.screen.wallpaperWindowActive
  );

  const dispatch = useDispatch();

  const widgetRender = useMemo(
    () =>
      widgets
        .filter((i: WidgetAbstraction) => i.active)
        .map((i: WidgetAbstraction) => (
          <WidgetView
            key={i.id}
            x={i.x}
            y={i.y}
            id={i.id}
            active={i.active}
            type={i.type}
          />
        )),
    [widgets]
  );

  return (
    <div
      className={classes}
      style={{
        backgroundImage: `url(${wallpaper})`,
      }}
    >
      {children}

      {wallpaperWindowActive && (
        <WallpaperWindow>
          <GalleryWidget />
        </WallpaperWindow>
      )}

      <div className={styles["widgets-container"]}>{widgetRender}</div>
    </div>
  );
};

export default Screen;
