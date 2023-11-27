import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebaseClient";
import { ImageData } from "@/types/types";

const useActiveWallpaper = (userId: string) => {
  const [activeWallpaper, setActiveWallpaper] = useState<string | null>(null);
  const getActiveWallpaper = async (userId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/wallpaper?userId=${userId}`
      );
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
      const res = await fetch(`http://localhost:3001/api/wallpaper`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
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
    if (userId) getActiveWallpaper(userId);
  }, [userId]);

  return {
    changeActiveWallpaper,
    activeWallpaper,
  };
};

export default useActiveWallpaper;
