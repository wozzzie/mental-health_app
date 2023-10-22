import styles from "./style.module.scss";

type WidgetProps = {
  children: React.ReactNode;
  className?: string;
};

const WidgetWrapper: React.FC<WidgetProps> = ({ children, className }) => {
  const wrapperClasses = [styles["widget-wrapper"], className].join(" ");

  return <div className={wrapperClasses}>{children}</div>;
};

export default WidgetWrapper;
