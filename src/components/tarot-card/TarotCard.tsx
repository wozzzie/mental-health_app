import styles from "./style.module.scss";
import Image from "next/image";

type Props = {
  img: {
    src: string;
    alt: string;
  };
  className?: string;
};

const TarotCard = ({ img, className }: Props) => {
  const taroBack = "/back.jpg";

  return (
    <>
      <div className={styles["tarot-card"] + " " + className}>
        <Image
          src={img.src}
          alt={img.alt}
          width={100}
          height={171}
          className={styles["tarot-card-front"]}
        />
        <Image
          src={taroBack}
          alt={"tarot-card-back"}
          width={100}
          height={171}
          className={styles["tarot-card-back"]}
        />
      </div>
    </>
  );
};

export default TarotCard;
