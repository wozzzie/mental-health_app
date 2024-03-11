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
import {
  SwitchTransition,
  Transition,
  TransitionStatus,
} from "react-transition-group";
import SettingsForm from "./SettingsForm";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeSettingsWindow } from "../screen/ScreenSlice";
import Image from "next/image";
import SmoothResizeBlock from "../smooth-resize-block/SmoothResizeBlock";
import Scrollbars from "rc-scrollbars";

type Props = {
  transitionState: TransitionStatus;
};

const Settings: FC<Props> = ({ transitionState }) => {
  const settings = useAppSettings();

  const [chosenGroup, setChosenGroup] = useState<number>(0);

  const { t } = useTranslation();

  const { user } = useAuth();

  const dispatch = useDispatch();

  return createPortal(
    <div
      className={styles["settings__bounds"]}
      style={{
        opacity:
          transitionState === "entered" || transitionState === "entering"
            ? 1
            : 0,
        zIndex:
          transitionState === "entered" ||
          transitionState === "entering" ||
          transitionState === "exiting"
            ? 200
            : -1,
      }}
      onClick={(e) =>
        e.currentTarget === e.target ? dispatch(closeSettingsWindow()) : null
      }
    >
      <WidgetWrapper
        className={
          styles["settings__wrapper"] +
          (transitionState === "entering" || transitionState === "entered"
            ? " " + styles["settings__wrapper_visible"]
            : "")
        }
      >
        <h2 className={styles["settings__header"]}>
          {t("settings.settings")}
          <span
            className={styles["settings__close"]}
            onClick={() => dispatch(closeSettingsWindow())}
          >
            <Image width={20} height={20} src="/close.svg" alt="close" />
          </span>
        </h2>
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
                <Scrollbars
                  classes={{
                    view: styles["settings__chosen"],
                  }}
                  style={{
                    transition: "300ms all",
                    opacity: s === "entered" || s === "entering" ? 1 : 0,
                  }}
                >
                  {(settings.groups[chosenGroup] as settingsGroup).settings.map(
                    (item, i) => (
                      <SmoothResizeBlock
                        innerClassNames={styles["settings__element"]}
                        key={i + " " + chosenGroup}
                      >
                        {item.type !== "controlled" && (
                          <div className={styles["settings__description"]}>
                            {t(
                              "settings." +
                                settings.groups[chosenGroup].name +
                                "." +
                                item.name
                            )}
                          </div>
                        )}
                        {item.type === "switch" ? (
                          <div className={styles["settings__switch"]}>
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
                          </div>
                        ) : item.type === "select-form" ? (
                          <div className={styles["settings__select"]}>
                            <Select
                              options={item.valueVariants.filter(
                                (i) => i !== item.selectedValue
                              )}
                              inputValue={
                                item.selectedValue ||
                                t("settings.select-default")
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
                        ) : item.type === "controlled" ? (
                          item.component
                        ) : (
                          ""
                        )}
                      </SmoothResizeBlock>
                    )
                  )}
                </Scrollbars>
              )}
            </Transition>
          </SwitchTransition>
        </div>
      </WidgetWrapper>
    </div>,

    document.body
  );
};

export default Settings;
