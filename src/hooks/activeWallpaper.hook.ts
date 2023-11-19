import { useState, useEffect } from "react";

const useActiveWallpaper = (userId: string) => {
  const [activeWallpaper, setActiveWallpaper] = useState<string | null>(null);
  const getActiveWallpaper = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/wallpaper?userId=${userId}`
      );
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
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
      const data = await res.json();
      setActiveWallpaper(data[0].image);
    } catch (e) {
      console.error("useActiveWallpaper error");
      console.error(e);
    }
  };

  useEffect(() => {
    getActiveWallpaper();
  }, []);

  return {
    changeActiveWallpaper,
    activeWallpaper,
  };
};

export default useActiveWallpaper;
