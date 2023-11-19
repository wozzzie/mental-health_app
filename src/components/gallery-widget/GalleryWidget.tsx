import { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "@/firebase/firebaseClient";
import { useDispatch } from "react-redux";
import { changeWallpaper } from "../screen/ScreenSlice";
import DragNDrop from "../drag-n-drop/DragNDrop";
import { ImageData } from "@/types/types";

import styles from "./style.module.scss";

const GalleryWidget = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [showDragNDrop, setShowDragNDrop] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File | null>(null);
  const dispatch = useDispatch();
  const user = auth.currentUser?.uid;

  const handleAddBg = (file: File) => {
    const allowedExtensions: string[] = ["jpeg", "jpg", "png"];
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (allowedExtensions.includes(extension || "")) {
      setDroppedFiles(file);
    } else {
      alert("Invalid format");
    }
    setShowDragNDrop(false);
  };

  const getWallpaper = async (userId: string) => {
    if (!userId) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/wallpaper?userId=${userId}`
      );
      const data = await response.json();

      if (response.status === 200) {
        console.log("Wallpaper get successfully");
      } else {
        console.error(
          "Failed to get wallpaper:",
          response.status,
          response.statusText
        );
      }
      return data;
    } catch (error) {
      console.error("Error getting wallpaper:", error);
    }
  };
  getWallpaper(user as string).then(console.log);

  const getBgFromServer = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/images?uid=${user}`,
        { method: "GET" }
      );
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

  const handleImageClick = async (imageId: string, imageSource: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/wallpaper`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user, imageId }),
      });
      dispatch(changeWallpaper(imageSource));

      if (response.status === 200) {
        console.log("Wallpaper set successfully");
      } else {
        console.error(
          "Failed to set wallpaper:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error setting wallpaper:", error);
    }
  };

  const handleAddImage = () => {
    setShowDragNDrop(true);
  };

  useEffect(() => {
    getBgFromServer();
  }, [user]);

  const postBgToServer = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      if (user) {
        formData.append("uid", user);
      }

      const response = await fetch("http://localhost:3001/api/images/uploads", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        console.log("Image saved to the server successfully");
        const responseData = await response.json();
        const serverImageUrl = responseData.image;
        setImages((prevImages) => [...prevImages, { image: serverImageUrl }]);
      } else {
        console.error(
          "Failed to save image to the server. Response details:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (droppedFiles) {
        await postBgToServer(droppedFiles);
        setDroppedFiles(null);
      }
    };

    uploadImage();
  }, [droppedFiles]);

  return (
    <>
      <div id="gallery__container" className={styles["gallery__container"]}>
        {images.map((imageData, index) => {
          const imgSrc = (
            imageData.isDefault
              ? imageData.image
              : `http://localhost:3001/${imageData.image}`
          ).replace(/\\/, "/");
          return (
            <Image
              width={268}
              height={126}
              key={index}
              src={imgSrc}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(imageData._id as string, imgSrc)}
              className={styles["gallery__image"]}
            />
          );
        })}
        <div className={styles["gallery__add"]} onClick={handleAddImage}>
          <Image width={30} height={30} src="/add.svg" alt="add image" />
        </div>
        <DragNDrop
          isOpen={showDragNDrop}
          onClose={() => setShowDragNDrop(false)}
          handleChange={handleAddBg}
          name="image"
        />
      </div>
    </>
  );
};

export default GalleryWidget;
