import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useEffect } from "react";
import {
  SwitchTransition,
  Transition,
  TransitionGroup,
} from "react-transition-group";

import {
  WidgetAbstraction,
  getPreviousWidgetsState,
  toggleSettingsWindow,
  toggleWallpaperWindow,
  toggleWidget,
} from "./ScreenSlice";
import WallpaperWindow from "../wallpaper-window/WallpaperWindow";
import GalleryWidget from "../gallery-widget/GalleryWidget";
import useWallpaper from "@/hooks/wallpaper.hook";
import useActiveWallpaper from "@/hooks/activeWallpaper.hook";
import HoroscopeWidget from "../horoscope-widget/Horoscope";
import { useAuth } from "../auth/authProvider";
import { RootState } from "@/store/store";
import WidgetView from "../widget-view/WidgetView";
import { useGetActiveWallpaperQuery } from "@/apis/active-wallpaper.api";
import styles from "./style.module.scss";
import Widgetbar from "../widgetbar/Widgetbar";
import Settings from "../settings/Settings";
import { ImageData } from "@/types/types";
import serverURL from "@/constants/serverURL";

type ScreenProps = {
  className?: string;
};

const Screen: React.FC<ScreenProps> = ({ className }) => {
  const classes = [styles["screen"], className].join(" ");

  const { user } = useAuth();

  const widgets = useSelector((s: RootState) => s.screen.widgets);
  const { data: activeWallpaper, isFetching } = useGetActiveWallpaperQuery(
    user?.uid as string
  );

  useEffect(() => {
    dispatch(getPreviousWidgetsState());
  }, []);

  const formatImageURL = (imageData: ImageData) => {
    const ret = (
      imageData.isDefault ? imageData.image : `${serverURL}/${imageData.image}`
    ).replace(/\\/, "/");
    return ret;
  };

  useEffect(() => {
    if (activeWallpaper && activeWallpaper.length) {
      setWallpaper(formatImageURL(activeWallpaper[0]));
    } else {
      setWallpaper("app-bg.jpeg");
    }
    //eslint-disable-next-line
  }, [activeWallpaper]);

  const wallpaperWindowActive = useSelector(
    (s: RootState) => s.screen.wallpaperWindowActive
  );

  const settingsWindowActive = useSelector(
    (s: RootState) => s.screen.settingsWindowActive
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

  const comp = (a: WidgetAbstraction, b: WidgetAbstraction) => +a.id - +b.id;

  const wallpaperTimeout = 300;

  const skeletonVisible = useSelector(
    (s: RootState) => s.screen.skeletonVisible
  );

  return (
    <div
      className={classes}
      style={{
        ...backgroundStyle,
      }}
    >
      <Transition timeout={wallpaperTimeout} in={skeletonVisible}>
        {(s) => (
          <div
            className={styles["screen__wallpaper-skeleton"]}
            style={{
              transition: `${wallpaperTimeout}ms opacity`,
              opacity: s === "entered" || s === "entering" ? 1 : 0,
            }}
          ></div>
        )}
      </Transition>
      <Widgetbar
        buttons={[
          ...[...widgets].sort(comp).map((i: WidgetAbstraction) => ({
            img: i.icon,
            action: () => dispatch(toggleWidget(i.id)),
            key: i.id,
            active: i.active,
          })),
          {
            img: {
              src: "/wallpaper.svg",
              alt: "wallpapers",
            },
            action: () => dispatch(toggleWallpaperWindow()),
            key: "wallpaper",
            active: wallpaperWindowActive,
          },
          {
            img: {
              src: "/settings.svg",
              alt: "settings",
            },
            action: () => dispatch(toggleSettingsWindow()),
            key: "settings",
            active: settingsWindowActive,
          },
        ]}
      />
      <SwitchTransition>
        <Transition
          in={wallpaperWindowActive}
          timeout={250}
          mountOnEnter
          unmountOnExit
          key={
            wallpaperWindowActive
              ? "wallpaper"
              : settingsWindowActive
              ? "settings"
              : "none"
          }
        >
          {wallpaperWindowActive ? (
            (s) => (
              <WallpaperWindow transitionState={s}>
                <GalleryWidget />
              </WallpaperWindow>
            )
          ) : settingsWindowActive ? (
            (s) => <Settings transitionState={s} />
          ) : (
            <></>
          )}
        </Transition>
      </SwitchTransition>

      <div className={styles["widgets-container"]}>
        <TransitionGroup component={null}>{widgetRender}</TransitionGroup>
      </div>
    </div>
  );
};

export default Screen;
