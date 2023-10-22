import classes from "./style.module.scss";
import Image from "next/image";

type LandingButtonProps = {
  variant?: "text" | "filled";
  disabled?: boolean;
  onClick?: () => void | Promise<boolean> | Promise<void>;
  iconProps?: {
    src: string;
    alt: string;
    size: number;
  };
  text?: string;
  testId?: string;
  fullwidth?: boolean;
  type?: "submit" | "reset" | "button"
};

const LandingButton = ({
  variant = "filled",
  disabled = false,
  onClick,
  iconProps,
  testId,
  text = "",
  fullwidth= false,
  type = "button"
}: LandingButtonProps) => {
  return (
    <button
      className={
        (variant === "filled" ? classes["button-filled"] : classes["button-text"])
        + (fullwidth ? " " + classes["button-fullwidth"] : "")
        + " " + classes["button"]
      }
      disabled={disabled}
      data-testid={testId}
      onClick={onClick}
      type={type}
    >
      {iconProps ? (
        <Image
          src={iconProps.src}
          width={iconProps.size}
          height={iconProps.size}
          alt={iconProps.alt}
        />
      ) : null}
      <span>{text}</span>
    </button>
  );
};

export default LandingButton;
