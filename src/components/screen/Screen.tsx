import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useEffect } from "react";
import { Transition, TransitionGroup } from "react-transition-group";

import {
  WidgetAbstraction,
  toggleWallpaperWindow,
  toggleWidget,
} from "./ScreenSlice";
import WallpaperWindow from "../wallpaper-window/WallpaperWindow";
import GalleryWidget from "../gallery-widget/GalleryWidget";
import useWallpaper from "@/hooks/wallpaper.hook";
import useActiveWallpaper from "@/hooks/activeWallpaper.hook";
import { useAuth } from "../auth/authProvider";
import { RootState } from "@/store/store";
import WidgetView from "../widget-view/WidgetView";
import { useGetActiveWallpaperQuery } from "@/apis/active-wallpaper.api";
import styles from "./style.module.scss";
import Widgetbar from "../widgetbar/Widgetbar";

type ScreenProps = {
  className?: string;
};

const Screen: React.FC<ScreenProps> = ({ className }) => {
  const classes = [styles["screen"], className].join(" ");

  const { user } = useAuth();

  const widgets = useSelector((s: RootState) => s.screen.widgets);
  const { data: activeWallpaper } = useGetActiveWallpaperQuery(
    user?.uid as string
  );

  useEffect(() => {
    if (activeWallpaper) {
      setWallpaper(activeWallpaper[0].image);
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
          const TRANSITION_TIMEOUT = 250;
          return (
            <Transition
              key={i.id}
              mountOnEnter
              unmountOnExit
              timeout={TRANSITION_TIMEOUT}
            >
              {(s) => (
                <WidgetView
                  {...i}
                  transitionState={s}
                  transitionTimeout={TRANSITION_TIMEOUT}
                />
              )}
            </Transition>
          );
        }),
    [widgets]
  );

  const { backgroundStyle, setWallpaper } = useWallpaper();

  const comp = (a: WidgetAbstraction, b: WidgetAbstraction) =>
    a.type > b.type ? 1 : a.type < b.type ? -1 : 0;

  return (
    <div
      className={classes}
      style={{
        transition: "0.5s background-image",
        ...backgroundStyle,
      }}
    >
      <Widgetbar
        buttons={[
          ...[...widgets].sort(comp).map((i: WidgetAbstraction) => ({
            img: i.icon,
            action: () => dispatch(toggleWidget(i.type)),
            key: i.type,
            active: i.active,
          })),
          {
            img: {
              src: "/wallpaper.svg",
              alt: "Wallpapers",
            },
            action: () => dispatch(toggleWallpaperWindow()),
            key: "wallpaper",
            active: wallpaperWindowActive,
          },
        ]}
      />
      <Transition
        in={wallpaperWindowActive}
        timeout={250}
        mountOnEnter
        unmountOnExit
      >
        {(s) => (
          <WallpaperWindow transitionState={s}>
            <GalleryWidget />
          </WallpaperWindow>
        )}
      </Transition>

      <div className={styles["widgets-container"]}>
        <TransitionGroup component={null}>{widgetRender}</TransitionGroup>
      </div>
    </div>
  );
};

export default Screen;
