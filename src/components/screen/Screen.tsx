import styles from "./style.module.scss";

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
};

const Screen: React.FC<ScreenProps> = ({ children, className }) => {
  const classes = [styles["screen"], className].join(" ");

  return <div className={classes}>{children}</div>;
};

export default Screen;
