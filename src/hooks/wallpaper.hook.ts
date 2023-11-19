import { useEffect, useMemo, useState, useRef } from "react";

export interface BackgroundStyle {
  backgroundImage: string;
}

const WHITE_BG = "/white.png";

const useWallpaper = () => {
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>({
    backgroundImage: `url(${WHITE_BG})`,
  });

  const newWallpaper = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (wallpaper) {
      newWallpaper.current = document.createElement("img");
      newWallpaper.current.src = wallpaper;
      const handleLoad = () => {
        setBackgroundStyle(() => ({
          backgroundImage: `url(${wallpaper})`,
        }));
      };
      newWallpaper.current.addEventListener("load", handleLoad);
      return () =>
        (newWallpaper.current as HTMLImageElement).removeEventListener(
          "load",
          handleLoad
        );
    }
  }, [wallpaper]);

  return {
    backgroundStyle,
    setWallpaper,
  };
};

export default useWallpaper;
