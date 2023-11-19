import ReactDOM from "react-dom";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import styles from "./style.module.scss";

const fileTypes: ("jpeg" | "png" | "jpg")[] = ["jpeg", "png", "jpg"];

interface DragNDropProps {
  isOpen: boolean;
  onClose: () => void;
  handleChange: (file: File) => void;
  name: string;
}

const DragNDrop: React.FC<DragNDropProps> = ({
  isOpen,
  onClose,
  handleChange,
  name,
}) => {
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles["drag-n-drop__overlay"]} onClick={onClose}>
      <div className={styles["drag-n-drop__centered"]}>
        <FileUploader
          handleChange={handleChange}
          name={name}
          types={fileTypes}
          classes={styles["drag-n-drop__block"]}
          onTypeError={() => {
            setIsError(true);
          }}
        >
          <Image
            src="/drag-drop-img.svg"
            width={39}
            height={29}
            alt="drop-img"
          />
          <p className={styles["drag-n-drop__text"]}>
            {t("drag-n-drop.drop")}
            <span className={styles["drag-n-drop__choose"]}>
              {t("drag-n-drop.choose")}
            </span>
          </p>
          {isError ? (
            <p className={styles["drag-n-drop__text"]}>
              {t("drag-n-drop.type-error")}
            </p>
          ) : null}
          <p className={styles["drag-n-drop__maxSize"]}>
            {t("drag-n-drop.max-size")}
          </p>
        </FileUploader>
      </div>
    </div>,
    document.body
  );
};

export default DragNDrop;
