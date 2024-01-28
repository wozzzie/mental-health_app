import { FC, ReactNode } from "react";
import styles from "./style.module.scss";

interface Props {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

const AppButton: FC<Props> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={styles["app-btn"] + (className ? " " + className : "")}
    >
      {children}
    </button>
  );
};

export default AppButton;
