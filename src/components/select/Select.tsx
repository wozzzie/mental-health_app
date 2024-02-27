import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { Transition, TransitionStatus } from "react-transition-group";
import { useTranslation } from "react-i18next";

type SelectProps = {
  onChange: (option: string) => void;
  inputValue: string;
  options: string[];
};

const Select = ({ onChange, inputValue, options }: SelectProps) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const firstClick = useRef<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleBlur = () => {
      if (firstClick.current) {
        setIsOptionsVisible(false);
        firstClick.current = false;
      } else firstClick.current = true;
    };

    if (isOptionsVisible) {
      document.addEventListener("click", handleBlur);
    } else {
      document.removeEventListener("click", handleBlur);
    }
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, [isOptionsVisible]);

  const handleSelectToggle = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsOptionsVisible(false);
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <div className={styles["select__custom"]}>
      <div
        className={
          styles["select__trigger"] +
          " " +
          (isOptionsVisible ? styles["select__trigger_active"] : "")
        }
        onClick={handleSelectToggle}
      >
        {inputValue || t("horoscope.select-option")}
      </div>

      <Transition
        timeout={300}
        in={isOptionsVisible}
        mountOnEnter
        unmountOnExit
      >
        {(state: TransitionStatus) => (
          <div
            className={styles["select__options"]}
            style={{
              ...transitionStyles.entering,
              ...transitionStyles[
                state as "entering" | "entered" | "exiting" | "exited"
              ],
            }}
          >
            {options.map((option) => (
              <div
                key={option}
                className={styles["select__option"]}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Select;
