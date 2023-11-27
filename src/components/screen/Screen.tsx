import { useDispatch, useSelector } from "react-redux";
import { createRef, useMemo, useRef } from "react";
import { useEffect } from "react";
import { Transition, TransitionGroup } from "react-transition-group";

import { WidgetAbstraction } from "./ScreenSlice";
import WallpaperWindow from "../wallpaper-window/WallpaperWindow";
import GalleryWidget from "../gallery-widget/GalleryWidget";
import useWallpaper from "@/hooks/wallpaper.hook";
import useActiveWallpaper from "@/hooks/activeWallpaper.hook";
import { useAuth } from "../auth/authProvider";
import { RootState } from "@/store/store";
import WidgetView from "../widget-view/WidgetView";

import styles from "./style.module.scss";

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
};

const Screen: React.FC<ScreenProps> = ({ children, className }) => {
  const classes = [styles["screen"], className].join(" ");

  const { user } = useAuth();

  const widgets = useSelector((s: RootState) => s.screen.widgets);

  const wallpaper = useSelector((s: RootState) => s.screen.wallpaper);

  const { activeWallpaper } = useActiveWallpaper(user?.uid as string);

  useEffect(() => {
    if (activeWallpaper) {
      setWallpaper(activeWallpaper);
    } else {
      setWallpaper("app-bg.jpeg");
    }
    //eslint-disable-next-line
  }, [activeWallpaper]);

  const wallpaperWindowActive = useSelector(
    (s: RootState) => s.screen.wallpaperWindowActive
  );

  const dispatch = useDispatch();

  const widgetRender = useMemo(
    () =>
      widgets
        .filter((i: WidgetAbstraction) => i.active)
        .map((i: WidgetAbstraction) => {
          return (
            <WidgetView
              key={i.id}
              x={i.x}
              y={i.y}
              id={i.id}
              active={i.active}
              type={i.type}
            />
          );
        }),
    [widgets]
  );

  const { backgroundStyle, setWallpaper } = useWallpaper();

  useEffect(() => {
    setWallpaper(wallpaper);
    //eslint-disable-next-line
  }, [wallpaper]);

  return (
    <div
      className={classes}
      style={{
        transition: "0.5s background-image",
        ...backgroundStyle,
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
