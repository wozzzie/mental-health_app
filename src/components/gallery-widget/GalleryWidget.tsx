import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./style.module.scss";
import { changeWallpaper } from "../screen/ScreenSlice";
import { useDispatch } from "react-redux";

type ImageData = {
  image: string;
};

const GalleryWidget = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const dispatch = useDispatch();

  const getBgFromServer = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/images", {
        method: "GET",
      });
      if (response.ok) {
        const imageList = await response.json();
        setImages(imageList);
      } else {
        throw new Error("Failed to retrieve images");
      }
    } catch (error) {
      console.log(error);
      console.error("Error fetching images:", error);
    }
  };

  const handleImageClick = (imageSource: string) => {
    dispatch(changeWallpaper(imageSource));
  };

  useEffect(() => {
    getBgFromServer();
  }, []);

  return (
    <div id="gallery__container" className={styles["gallery__container"]}>
      {images.map((imageData, index) => (
        <Image
          width={268}
          height={126}
          key={index}
          src={imageData.image}
          alt={`Image ${index}`}
          onClick={() => handleImageClick(imageData.image)}
          className={styles["gallery__image"]}
        />
      ))}
    </div>
  );
};

export default GalleryWidget;
