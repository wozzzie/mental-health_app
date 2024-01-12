import styles from "./style.module.scss";
import Image from "next/image";
import useCardAnimation from "@/hooks/cardAnimation.hook";
import { useEffect, useMemo, useRef, useState } from "react";
import useWallpaper from "@/hooks/wallpaper.hook";
import Skeleton from "./tarot-skeleton.svg";
type Props = {
  img: {
    src: string;
    alt: string;
  };
  className?: string;
  reversed?: boolean;
};

const TarotCard = ({ img, className, reversed = false }: Props) => {
  const tarotBack = "/back.jpg";

  const tarotRef = useRef<HTMLDivElement>(null);

  const hoverRef = useRef<HTMLDivElement>(null);

  useCardAnimation(tarotRef, hoverRef);

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleLoad = () => {
    console.log("7788");
    setImageLoaded(true);
  };
  const rotatedStyles = useMemo<string>(
    () => (reversed ? " " + styles["tarot-card_rotated"] : ""),
    [reversed]
  );

  return (
    <div
      style={{ overflow: "visible", transformStyle: "preserve-3d" }}
      ref={hoverRef}
      className={styles["tarot-card-area"]}
    >
      <div
        className={styles["tarot-card"] + " " + rotatedStyles + " " + className}
        ref={tarotRef}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={100}
          height={171}
          className={styles["tarot-card-front"] + rotatedStyles}
          style={
            imageLoaded
              ? {}
              : {
                  visibility: "hidden",
                  position: "absolute",
                  zIndex: -30498034,
                }
          }
          onLoadingComplete={handleLoad}
        />
        {!imageLoaded && <Skeleton width={100} height={171} />}
        <Image
          src={tarotBack}
          alt={"tarot-card-back"}
          width={100}
          height={171}
          className={styles["tarot-card-back"] + rotatedStyles}
        />
      </div>
    </div>
  );
};

export default TarotCard;
