import { FC } from "react";
import styles from "./style.module.scss";

interface Props {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
  name?: string;
}

const SettingsSwitch: FC<Props> = ({
  isActive,
  onChange,
  name = "checkbox",
}) => {
  return (
    <label
      className={
        styles["switch"] + " " + (isActive ? styles["switch_active"] : "")
      }
    >
      <input
        type="checkbox"
        name={name}
        checked={isActive}
        onChange={() => onChange(!isActive)}
        className={styles["switch__checkbox"]}
      />
      <span className={styles["switch__toggle"]}></span>
    </label>
  );
};

export default SettingsSwitch;
