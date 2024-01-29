import { FC, FormEvent, SyntheticEvent, useState } from "react";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import {
  selectFormSetting,
  settingsGroup,
  settingsStateType,
  switchSetting,
  useAppSettings,
} from "./settingsProvider";
import styles from "./style.module.scss";
import { useTranslation } from "next-i18next";
import SettingsSwitch from "../settings-switch/SettingsSwitch";
import Select from "../select/Select";
import WidgetInput from "../widget-input/WidgetInput";
import AppButton from "../app-button/AppButton";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../auth/authProvider";
import { SwitchTransition, Transition } from "react-transition-group";
import SettingsForm from "./SettingsForm";

type Props = {
  transitionState: "entered" | "entering" | "exited" | "exiting";
};

const Settings: FC<Props> = ({ transitionState }) => {
  const settings = useAppSettings();

  const [chosenGroup, setChosenGroup] = useState<number>(0);

  const { t } = useTranslation();

  const { user } = useAuth();

  return (
    <WidgetWrapper
      className={
        styles["settings__wrapper"] +
        (transitionState === "entering" || transitionState === "entered"
          ? " " + styles["settings__wrapper_visible"]
          : "")
      }
    >
      <h2 className={styles["settings__header"]}>{t("settings.settings")}</h2>
      <div className={styles["settings"]}>
        <div className={styles["settings__groups"]}>
          {settings.groups.map((group, i) => (
            <div
              key={i}
              className={
                styles["settings__group"] +
                (i === chosenGroup
                  ? " " + styles["settings__group_active"]
                  : "")
              }
              onClick={() => setChosenGroup(i)}
            >
              {t("settings." + group.name + ".group-name")}
            </div>
          ))}
        </div>
        <div className={styles["settings__divider"]}></div>
        <SwitchTransition>
          <Transition key={chosenGroup} timeout={300} mountOnEnter>
            {(s) => (
              <div
                className={styles["settings__chosen"]}
                style={{
                  transition: "300ms all",
                  opacity: s === "entered" || s === "entering" ? 1 : 0,
                }}
              >
                {(settings.groups[chosenGroup] as settingsGroup).settings.map(
                  (item, i) => (
                    <div
                      className={styles["settings__element"]}
                      key={i + " " + chosenGroup}
                    >
                      <div className={styles["settings__description"]}>
                        {t(
                          "settings." +
                            settings.groups[chosenGroup].name +
                            "." +
                            item.name
                        )}
                      </div>
                      {item.type === "switch" ? (
                        <SettingsSwitch
                          isActive={item.value}
                          onChange={(isActive: boolean) => {
                            // settings.change((s) => {
                            //   const tmp = { ...s };
                            //   tmp.groups[chosenGroup].settings[i] = {
                            //     ...tmp.groups[chosenGroup].settings[i],
                            //     value: isActive,
                            //   } as switchSetting;
                            //   return tmp;
                            // });
                            item.callback(isActive);
                          }}
                        />
                      ) : item.type === "select-form" ? (
                        <div className={styles["settings__select"]}>
                          <Select
                            options={item.valueVariants.filter(
                              (i) => i !== item.selectedValue
                            )}
                            inputValue={
                              item.selectedValue || t("settings.select-default")
                            }
                            onChange={(option: string) => {
                              // settings.change((s) => {
                              //   const tmp = { ...s };
                              //   tmp.groups[chosenGroup].settings[i] = {
                              //     ...tmp.groups[chosenGroup].settings[i],
                              //     selectedValue: option,
                              //   } as selectFormSetting;
                              //   return tmp;
                              // });
                              item.callback(option);
                            }}
                          />
                        </div>
                      ) : item.type === "form" ? (
                        <SettingsForm formSetting={item} />
                      ) : (
                        ""
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </Transition>
        </SwitchTransition>
      </div>
    </WidgetWrapper>
  );
};

export default Settings;
