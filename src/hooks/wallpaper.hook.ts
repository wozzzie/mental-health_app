import { hideSkeleton } from "@/components/screen/ScreenSlice";
import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";

export interface BackgroundStyle {
  backgroundImage: string;
}

const WHITE_BG = "/white.svg";

const useWallpaper = (placeholderBG: string = WHITE_BG) => {
  const [wallpaper, setWallpaper] = useState<string | null>(null);
  const dispatch = useDispatch();

  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>({
    backgroundImage: `url(${placeholderBG})`,
  });

  const wallpaperUrl = useMemo<string>(
    () => wallpaper || placeholderBG,
    [backgroundStyle]
  );

  const newWallpaper = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (wallpaper) {
      newWallpaper.current = document.createElement("img");
      newWallpaper.current.src = wallpaper;
      const handleLoad = () => {
        setBackgroundStyle(() => ({
          backgroundImage: `url(${wallpaper})`,
        }));
        dispatch(hideSkeleton());
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
    wallpaperUrl,
  };
};

export default useWallpaper;
