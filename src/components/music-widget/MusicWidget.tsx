import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import Image from "next/image";
import { closeWidget } from "../screen/ScreenSlice";
import { useCallback, useMemo } from "react";
import { setLink } from "./musicSlice";
import { useTranslation } from "next-i18next";
import { RootState } from "../../store/store";
import SmoothResizeBlock from "../smooth-resize-block/SmoothResizeBlock";
import WidgetInput from "../widget-input/WidgetInput";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import AppButton from "../app-button/AppButton";

const MusicWidget = () => {
  const link = useSelector((s: RootState) => s.music.link);

  useLayoutEffect(() => {
    dispatch(setLink(localStorage.getItem("musicLink") || ""));
  }, []);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const { t } = useTranslation();
  const transitionRef = useRef(null);

  const validatedType = useMemo<
    "start" | "apple" | "spotify" | "iheart" | "wrong"
  >(
    () =>
      !link
        ? "start"
        : link.indexOf("https://open.spotify.com/") === 0
        ? "spotify"
        : link.indexOf("https://music.apple.com/") === 0
        ? "apple"
        : link.indexOf("https://www.iheart.com/podcast/") === 0
        ? "iheart"
        : "wrong",
    [link]
  );

  const handleNewLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLink(inputRef?.current?.value || ""));
    localStorage.setItem("musicLink", inputRef?.current?.value || "");
  };

  return (
    <div className={styles["music-widget"]}>
      <SmoothResizeBlock classNames={styles["content-block"]}>
        <SwitchTransition>
          <CSSTransition
            key={validatedType}
            timeout={300}
            classNames={{
              enter: styles["transit-screen-enter"],
              enterActive: styles["transit-screen-enter-active"],
              exit: styles["transit-screen-exit"],
              exitActive: styles["transit-screen-exit-active"],
            }}
            mountOnEnter
            unmountOnExit
            nodeRef={transitionRef}
          >
            {validatedType === "apple" ? (
              <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                height="175"
                style={{
                  maxWidth: "660px",
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: "10px",
                }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src={(link as string).replace("music", "embed.music")}
                className={
                  styles["iframe-apple"] + " " + styles["transit-screen"]
                }
                ref={transitionRef}
              />
            ) : validatedType === "iheart" ? (
              <iframe
                allow="autoplay"
                width="100%"
                style={{
                  maxWidth: 660,
                }}
                height="300"
                src={link + "?embed=true"}
                className={styles["transit-screen"]}
                ref={transitionRef}
              ></iframe>
            ) : validatedType === "spotify" ? (
              <iframe
                src={
                  (link as string).replace(".com/", ".com/embed/") +
                  "&utm_source=generator&theme=0"
                }
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className={styles["transit-screen"]}
                ref={transitionRef}
              ></iframe>
            ) : validatedType === "start" ? (
              <div
                className={
                  styles["start-message"] + " " + styles["transit-screen"]
                }
                ref={transitionRef}
              >
                <h3 className={styles["start-message-title"]}>
                  {t("music.input-placeholder")}
                </h3>
              </div>
            ) : validatedType === "wrong" ? (
              <div
                className={
                  styles["wrong-url-message"] + " " + styles["transit-screen"]
                }
                ref={transitionRef}
              >
                <h3 className={styles["wrong-url-message-title"]}>
                  {t("music.wrong-url-message-title")}
                </h3>
              </div>
            ) : (
              <></>
            )}
          </CSSTransition>
        </SwitchTransition>
      </SmoothResizeBlock>
      <form className={styles["music-link"]} onSubmit={handleNewLink}>
        <div className={styles["music-link__wrapper"]}>
          <WidgetInput
            className={styles["music-link-input"]}
            placeholder={"URL"}
            elementRef={inputRef}
            small={false}
            name="music-link-input"
          />
        </div>
        <AppButton type="submit" className={styles["music-link__btn"]}>
          {t("music.open-btn")}
        </AppButton>
      </form>
    </div>
  );
};
export default MusicWidget;

// https://open.spotify.com/embed/playlist/37i9dQZF1EIXJ18peKvF9W?utm_source=generator&theme=0
// https://open.spotify.com/playlist/37i9dQZF1EIXJ18peKvF9W?si=745ac55aee9d402f

//https://youtu.be/Urh_botbjRQ

//
//<iframe src="" frameborder="0" allow="encrypted-media" id="ytplayer"></iframe>

// https://www.youtube.com/embed/?listType=playlist&amp;list=OLAK5uy_nNwjlnTS3h6Gp0IK_b4wpUyRsYThMmg4A
// https://music.youtube.com/playlist?list=OLAK5uy_nNwjlnTS3h6Gp0IK_b4wpUyRsYThMmg4A&feature=shared

//https://open.spotify.com/playlist/37i9dQZF1EIXJ18peKvF9W?si=745ac55aee9d402f
// https://music.youtube.com/playlist?list=OLAK5uy_nNwjlnTS3h6Gp0IK_b4wpUyRsYThMmg4A&feature=shared
//"https://music.apple.com/us/album/promo-single/1703859928"
// Paste Apple Music, Spotify or YT URL
