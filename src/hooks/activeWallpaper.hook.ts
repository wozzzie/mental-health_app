import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebaseClient";
import { ImageData } from "@/types/types";
import serverURL from "@/constants/serverURL";

const useActiveWallpaper = (uid: string) => {
  const [activeWallpaper, setActiveWallpaper] = useState<string | null>(null);
  const getActiveWallpaper = async (uid: string) => {
    try {
      const res = await fetch(`${serverURL}/api/wallpaper?uid=${uid}`);
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = (await res.json()) as ImageData[];
      setActiveWallpaper(data[0].image);
    } catch (e) {
      console.error("useActiveWallpaper error");
      console.error(e);
    }
  };

  const changeActiveWallpaper = async (imageId: string) => {
    try {
      const res = await fetch(`${serverURL}/api/wallpaper`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          uid,
          imageId,
        }),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
    } catch (e) {
      console.error("useActiveWallpaper error");
      console.error(e);
    }
  };

  useEffect(() => {
    if (uid) getActiveWallpaper(uid);
  }, [uid]);

  return {
    changeActiveWallpaper,
    activeWallpaper,
  };
};

export default useActiveWallpaper;
