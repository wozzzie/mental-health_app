import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./style.module.scss";
import { changeWallpaper } from "../screen/ScreenSlice";
import { useDispatch } from "react-redux";
import DragNDrop from "../drag-n-drop/DragNDrop";
import { auth, firebase } from "@/firebase/firebaseClient";

type ImageData = {
  image: string;
  isDefault?: boolean;
};

type GalleryWidgetProps = {};
const allowedExtensions = ["jpeg", "jpg", "png"];

// const fileTypes: ("JPG" | "PNG" | "JPEG")[] = ["JPG", "PNG", "JPEG"];

const GalleryWidget: React.FC<GalleryWidgetProps> = ({}) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [showDragNDrop, setShowDragNDrop] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File | null>(null);
  const dispatch = useDispatch();
  const user = auth.currentUser?.uid;
  console.log("user-->", user);
  // console.log(typeof user)

  const handleAddBg = (file: File) => {
    const allowedExtensions = ["jpeg", "jpg", "png"];
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (allowedExtensions.includes(extension || "")) {
      setDroppedFiles(file);
    } else {
      alert("Invalid format");
    }
  };

  // не трогать
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

  const handleImageClick = (imageSource: string) => {
    console.log(imageSource)
    dispatch(changeWallpaper(imageSource));
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
    if (droppedFiles) {
      const newImages = images.concat({
        image: URL.createObjectURL(droppedFiles),
      });
      console.log(droppedFiles);
      postBgToServer(droppedFiles);
      setImages(newImages);
      setDroppedFiles(null);
    }
  }, [droppedFiles]);

  return (
    <>
      <div id="gallery__container" className={styles["gallery__container"]}>
        {images.map((imageData, index) => {
          console.log("imageData:", imageData.image);

          const imgSrc = (imageData.isDefault
          ? imageData.image 
          : `http://localhost:3001/${imageData.image}`)
          .replace(/\\/,"/")
          return (
            <Image
              width={268}
              height={126}
              key={index}
              src={
                imgSrc
              } 
              alt={`Image ${index}`}
              onClick={() => handleImageClick(imgSrc)}
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
