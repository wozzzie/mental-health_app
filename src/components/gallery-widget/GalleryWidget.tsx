import { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "@/firebase/firebaseClient";
import { useDispatch } from "react-redux";
import DragNDrop from "../drag-n-drop/DragNDrop";
import { ImageData } from "@/types/types";
import { useChangeActiveWallpaperMutation } from "@/apis/active-wallpaper.api";
import { useAuth } from "../auth/authProvider";
import serverURL from "@/constants/serverURL";

import styles from "./style.module.scss";

const GalleryWidget = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [showDragNDrop, setShowDragNDrop] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File | null>(null);
  const { user } = useAuth();
  const [changeActiveWallpaper, result] = useChangeActiveWallpaperMutation();

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

  const getBgFromServer = async () => {
    try {
      const response = await fetch(`${serverURL}/api/images?uid=${user}`, {
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

  const handleImageClick = (imageSource: string, imageId: string) => {
    console.log(images);
    changeActiveWallpaper({ imageId, uid: user?.uid as string });
  };

  const handleAddImage = () => {
    setShowDragNDrop(true);
  };

  useEffect(() => {
    getBgFromServer();
    //eslint-disable-next-line
  }, [user]);

  const postBgToServer = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      if (user) {
        formData.append("uid", user.uid);
      }

      const response = await fetch(`${serverURL}/api/images/uploads`, {
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

    //eslint-disable-next-line
  }, [droppedFiles]);

  return (
    <>
      <div id="gallery__container" className={styles["gallery__container"]}>
        {images.map((imageData, index) => {
          const imgSrc = (
            imageData.isDefault
              ? imageData.image
              : `${serverURL}/${imageData.image}`
          ).replace(/\\/, "/");
          return (
            <Image
              width={268}
              height={126}
              key={index}
              src={imgSrc}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(imgSrc, imageData._id as string)}
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
