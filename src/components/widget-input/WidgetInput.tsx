import styles from "./style.module.scss";
import { ChangeEvent, FC, RefObject } from "react";

interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  small?: boolean;
  name: string;
  placeholder: string;
  className?: string;
  elementRef?: RefObject<HTMLInputElement>;
  inputProps?: any;
  variant?: "default" | "warning" | "success";
}

const WidgetInput: FC<Props> = ({
  onChange = () => {},
  small = false,
  className = "",
  elementRef = null,
  inputProps = null,
  variant = "default",
  ...props
}) => {
  return (
    <input
      {...{ ...props, onChange }}
      type="text"
      className={
        styles["widget-input"] +
        (small ? " " + styles["widget-input_small"] : "") +
        " " +
        className +
        (variant === "warning"
          ? " " + styles["widget-input_warning"]
          : variant === "success"
          ? " " + styles["widget-input_success"]
          : "")
      }
      {...(elementRef ? { ref: elementRef } : {})}
      {...(inputProps || {})}
    ></input>
  );
};

export default WidgetInput;
