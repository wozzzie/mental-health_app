import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { Transition, TransitionStatus } from "react-transition-group";
import { useTranslation } from "react-i18next";
import Scrollbars from "rc-scrollbars";

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
    const handleBlur = (e: MouseEvent) => {
      if (firstClick.current) {
        setIsOptionsVisible(false);
        firstClick.current = false;
        console.log("if!");
      } else firstClick.current = true;
      console.log(e);
      console.log(firstClick);
    };

    if (isOptionsVisible) {
      document.addEventListener("click", handleBlur);
    } else {
      document.removeEventListener("click", handleBlur);
      firstClick.current = false;
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
          <Scrollbars
            autoHide
            classes={{
              root: styles["select__scrollable-root"],
              // view: styles["select__scrollable-view"],
              trackVertical: styles["select__scrollable-track-v"],
              // trackHorizontal: styles["select__scrollable-track-h"],
              // thumbVertical: styles["select__scrollable-thumb-v"],
              // thumbHorizontal: styles["select__scrollable-thumb-h"],
            }}
            renderTrackHorizontal={(props) => (
              <div
                {...props}
                className={styles["select__scrollable-track-h"]}
              />
            )}
            renderTrackVertical={(props) => (
              <div
                {...props}
                className={styles["select__scrollable-track-v"]}
              />
            )}
            renderThumbHorizontal={(props) => (
              <div
                {...props}
                className={styles["select__scrollable-thumb-h"]}
              />
            )}
            renderThumbVertical={(props) => (
              <div
                {...props}
                className={styles["select__scrollable-thumb-v"]}
              />
            )}
            renderView={(props) => (
              <div {...props} className={styles["select__scrollable-view"]} />
            )}
            className={styles["select__options"]}
            style={{
              ...transitionStyles.entering,
              ...transitionStyles[
                state as "entering" | "entered" | "exiting" | "exited"
              ],
              height: Math.min(6, options.length) * 39,
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
          </Scrollbars>
        )}
      </Transition>
    </div>
  );
};

export default Select;
