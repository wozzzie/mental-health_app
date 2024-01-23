import styles from "./style.module.scss";
import { ChangeEvent, FC, RefObject } from "react";

interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  small?: boolean;
  name: string;
  placeholder: string;
  className?: string;
  elementRef?: RefObject<HTMLInputElement>;
}

const WidgetInput: FC<Props> = ({
  onChange = () => {},
  small = false,
  className = "",
  elementRef = null,
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
        className
      }
      {...(elementRef ? { ref: elementRef } : {})}
    ></input>
  );
};

export default WidgetInput;
