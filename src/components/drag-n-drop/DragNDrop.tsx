import ReactDOM from "react-dom";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from "next-i18next";

import styles from "./style.module.scss";

const fileTypes: ("JPEG" | "PNG" | "JPG")[] = ["JPEG", "PNG", "JPG"];

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
  if (!isOpen) return null;

  //   const [file, setFile] = useState(null);
  //   const handleChange = (file: any) => {
  //     setFile(file);
  //   };
  return ReactDOM.createPortal(
    <div className={styles["drag-n-drop__overlay"]} onClick={onClose}>
      <div className={styles["drag-n-drop__centered"]}>
        <div className={styles["drag-n-drop__block"]}>
          <FileUploader
            // multiple={true}
            handleChange={handleChange}
            name={name}
            types={fileTypes}
          >
            {t("drag-n-drop.drop")}
            <p>{t("drag-n-drop.choose")}</p>
          </FileUploader>
          {/* <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p> */}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DragNDrop;
