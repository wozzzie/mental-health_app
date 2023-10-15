import classes from "./style.module.scss"
import Image from "next/image"

type LandingButtonProps = {
    type?: "text" | "filled";
    disabled?:boolean;
    onClick?: () => void | Promise<boolean> | Promise<void>;
    iconProps?: {
        src: string;
        alt: string;
        size: number;
      };
    text?: string;
    testId?: string;
}

const LandingButton = ({type="filled", disabled=false, onClick, iconProps, testId, text=""} : LandingButtonProps) => {
    return (
    <button 
        className={type === "filled" ? classes["button-filled"] : classes["button-text"]} 
        disabled={disabled}
        data-testid={testId}

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
    )
}

export default LandingButton