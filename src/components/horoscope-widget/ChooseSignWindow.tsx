import React from "react";
import Select from "../select/Select";

import styles from "./style.module.scss";
import LandingButton from "../landing-button/LandingButton";
import { useTranslation } from "react-i18next";

const ChooseSignWindow: React.FC<{
  options: string[];
  inputValue: string;
  handleZodiacChange: (option: string) => void;
  handleSaveClick: () => void;
}> = React.memo(
  ({ inputValue, handleZodiacChange, handleSaveClick, options }) => {
    const { t } = useTranslation();

    return (
      <>
        <div className={styles["horoscope__wrapper"]}>
          <Select
            inputValue={inputValue}
            options={options}
            onChange={handleZodiacChange}
          />
          <LandingButton
            type="button"
            text={t("horoscope.search")}
            onClick={handleSaveClick}
          />
        </div>
      </>
    );
  }
);
ChooseSignWindow.displayName = "ChooseSignWindow";

export default ChooseSignWindow;
