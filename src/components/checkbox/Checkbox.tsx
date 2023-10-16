import { ChangeEvent } from "react";
import styles from "./style.module.scss";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (newChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onChange }) => {
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    onChange(newChecked);
  };

  return (
    <label className={styles.checkboxLabel}>
      <div className={styles.customCheckbox}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={styles.hiddenCheckbox}
        />
        <div
          className={`${styles.customCheckmark} ${
            isChecked ? styles.checked : ""
          }`}
        >
          {isChecked && (
            <picture>
              <img src="/check-icon.svg" alt="check-icon" />
            </picture>
          )}
        </div>
      </div>
      {label}
    </label>
  );
};

export default Checkbox;
