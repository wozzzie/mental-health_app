import { FC, ReactNode } from "react";
import styles from "./style.module.scss";

interface Props {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type: "button" | "submit" | "reset" | undefined;
}

const AppButton: FC<Props> = ({ onClick, children, className, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles["app-btn"] + (className ? " " + className : "")}
    >
      {children}
    </button>
  );
};

export default AppButton;
