import styles from "./style.module.scss";

type WidgetProps = {
  children: React.ReactNode;
  className?: string;
  hideOnBlur?: boolean;
};

const WidgetWrapper: React.FC<WidgetProps> = ({
  children,
  className,
  hideOnBlur = false,
}) => {
  const wrapperClasses =
    styles["widget-wrapper"] +
    " " +
    (hideOnBlur ? styles["widget-wrapper_hide-on-blur"] : "") +
    " " +
    className;

  return <div className={wrapperClasses}>{children}</div>;
};

export default WidgetWrapper;
