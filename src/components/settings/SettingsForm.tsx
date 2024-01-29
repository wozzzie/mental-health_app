import { FC, SyntheticEvent, useRef, useState } from "react";
import { inputFormSetting } from "./settingsProvider";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import WidgetInput from "../widget-input/WidgetInput";
import AppButton from "../app-button/AppButton";

type Props = {
  formSetting: inputFormSetting;
};

const SettingsForm: FC<Props> = ({ formSetting }) => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const [isOk, setIsOk] = useState<boolean>(true);

  return (
    <form
      onSubmit={(e: SyntheticEvent) => {
        e.preventDefault();
        const valRes = formSetting.validate(inputRef.current?.value as string);
        if (valRes.isOk)
          formSetting.callback(inputRef.current?.value as string);
        setValidationMessage(valRes.message as string);
        setIsOk(valRes.isOk);
      }}
      className={styles["settings__input__form"]}
    >
      <div className={styles["settings__form__input__wrapper"]}>
        <WidgetInput
          placeholder={formSetting.defaultValue}
          name="input"
          className={styles["settings__form__input"]}
          elementRef={inputRef}
        />
        {validationMessage && !isOk && (
          <div
            className={
              styles["settings__validation"] +
              (isOk ? " " + styles["settings__validation_success"] : "")
            }
          >
            {t("validation." + validationMessage)}
          </div>
        )}
      </div>
      <AppButton type="submit" className={styles["settings__form__btn"]}>
        {t("settings.change")}
      </AppButton>
    </form>
  );
};

export default SettingsForm;
