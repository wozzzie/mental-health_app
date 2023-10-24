import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { resizeWidget } from "../screen/ScreenSlice";
import { useEffect, useRef, useState} from "react"
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import Image from "next/image";
import { closeWidget } from "../screen/ScreenSlice";
import { useCallback, useMemo } from "react"
import { setLink } from "./musicSlice";


const MusicWidget = () => {

// https://open.spotify.com/playlist/37i9dQZF1EIXJ18peKvF9W?si=745ac55aee9d402f
//"https://music.apple.com/us/album/promo-single/1703859928"
  const link = useSelector(s => s.music.link);

  const inputRef = useRef();

  const dispatch = useDispatch();


  const validatedType = useMemo<"start" | "ytmusic" | "apple" | "spotify" | "wrong">(
    () => (
      !link ? "start"
      : link.indexOf("https://open.spotify.com/") === 0 ? "spotify"
      : link.indexOf("https://music.apple.com/") === 0 ? "apple" 
      : link.indexOf("https://music.youtube.com/watch") === 0 ? "ytmusic"
      : "wrong"
    ),
    [link]
  )
  

  return (
    <>
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
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"></iframe>
        ) : <div className={styles["wrong-url-message"]}>wrong</div>
      }
      <input 
      className={styles["music-link-input"]} 
      placeholder="Paste Apple Music, Spotify or YT Music URL"
      ref={inputRef}
      />
      <button onClick={()=>dispatch(setLink(inputRef.current.value))}>Open</button>
    </>
  );
  
}
export default MusicWidget;

// https://open.spotify.com/embed/playlist/37i9dQZF1EIXJ18peKvF9W?utm_source=generator&theme=0
// https://open.spotify.com/playlist/37i9dQZF1EIXJ18peKvF9W?si=745ac55aee9d402f