import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { useEffect, useRef, useState} from "react"
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import Image from "next/image";
import { closeWidget } from "../screen/ScreenSlice";
import { useCallback, useMemo } from "react"
import { setLink } from "./musicSlice";
import { useTranslation } from "next-i18next";

const MusicWidget = () => {

  const link = useSelector(s => s.music.link);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const validatedType = useMemo<"start" | "apple" | "spotify" | "wrong">(
    () => (
      !link ? "start"
      : link.indexOf("https://open.spotify.com/") === 0 ? "spotify"
      : link.indexOf("https://music.apple.com/") === 0 ? "apple" 
      : "wrong"
    ),
    [link]
  )
  

  return (
    <div className={styles["music-widget"]}>
      {
        validatedType === "apple" ? (
          <iframe 
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
            frameBorder="0" 
            height="175" 
            style={{
              maxWidth:"660px",
              width: "100%",
              overflow:"hidden",
              borderRadius:"10px"
            }} 
            scrolling="no"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={link.replace("music","embed.music")}
            className={styles["iframe-apple"]}/>
        ) : validatedType === "spotify" ? (
          <iframe 
            src={link.replace(".com/", ".com/embed/")+ "&utm_source=generator&theme=0"}
            width="100%" 
            height="352" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"></iframe>
        ) : validatedType === "start" ? (
          <div className={styles["start-message"]}>
          <h3 className={styles["start-message-title"]}>
            {t("music.start-message-title")}
          </h3>
          </div>
        ) : validatedType === "wrong" ? (
        <div className={styles["wrong-url-message"]}>
          <h3 className={styles["wrong-url-message-title"]}>
            {t("music.wrong-url-message-title")}
          </h3>
        </div>
        ) : ""
      }
      <div className={styles["music-link"]}>
        <input 
        className={styles["music-link-input"]} 
        placeholder={t("music.input-placeholder")}
        ref={inputRef}
        />
        <button className={styles["music-link-btn"]} onClick={()=>dispatch(setLink(inputRef?.current?.value || ""))}>Open</button>
      </div>
    </div>
  );
  
}
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