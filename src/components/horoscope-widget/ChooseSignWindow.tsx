import React from "react";
import Select from "../select/Select";

import styles from "./style.module.scss";
import Button from "../button/Button";
import LandingButton from "../landing-button/LandingButton";

const ChooseSignWindow: React.FC<{
  options: string[];
  inputValue: string;
  handleZodiacChange: (option: string) => void;
  handleSaveClick: () => void;
  zodiacSigns: string[];
}> = React.memo(
  ({
    inputValue,
    handleZodiacChange,
    handleSaveClick,
    zodiacSigns,
    options,
  }) => (
    <>
      <div className={styles["horoscope__wrapper"]}>
        <Select
          inputValue={inputValue}
          options={options}
          onChange={handleZodiacChange}
        />
        <LandingButton
          type="button"
          text="Search"
          onClick={handleSaveClick}
        />
      </div>
    </>
  )
);
ChooseSignWindow.displayName = "ChooseSignWindow";

export default ChooseSignWindow;
