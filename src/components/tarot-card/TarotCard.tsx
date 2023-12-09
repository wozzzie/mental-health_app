import styles from "./style.module.scss";
import Image from "next/image";
import useCardAnimation from "@/hooks/cardAnimation.hook";
import { useMemo, useRef } from "react";
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
        />
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
