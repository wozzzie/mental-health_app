import {
  FC,
  createContext,
  useState,
  Dispatch,
  ReactNode,
  useRef,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { useAuth } from "../auth/authProvider";
import { User, getAuth, updateProfile } from "firebase/auth";
import { NextRouter, useRouter } from "next/router";
import languageNames from "@/constants/languageNames";
import useClockSettingsCategory from "./categories/clockSettingsCategory.hook";
import useHoroscopeSettingsCategory, {
  ZodiacSign,
} from "./categories/horoscopeSettingsCategory.hook";
import useUserSettingsCategory from "./categories/userSettingsCategory.hook";

export type selectSetting = {
  type: "select";
  selectedValue: string | null;
  valueVariants: string[];
  name: string;
};

export type LoadingStatus = "pending" | "fetched" | "error" | "start";

export type selectFormSetting = {
  type: "select-form";
  selectedValue: string | null;
  valueVariants: string[];
  name: string;
  callback: (option: string) => void;
};

export type inputSetting = {
  type: "input";
  value: string;
  name: string;
};

export type inputFormSetting = {
  type: "form";
  defaultValue: string;
  name: string;
  callback: (inputValue: string) => void;
  validate: (inputStr: string) => { isOk: boolean; message?: string };
};

export type switchSetting = {
  type: "switch";
  value: boolean;
  name: string;
  callback: (isActive: boolean) => void;
};

export type settingsGroup = {
  name: string;
  settings: (
    | switchSetting
    | inputSetting
    | selectSetting
    | inputFormSetting
    | selectFormSetting
  )[];
};

export type settingsStateType = {
  groups: settingsGroup[];
};

export type settingsContextType = {
  state: settingsStateType;
  hooks: {
    clock: ReturnType<typeof useClockSettingsCategory>["hook"];
    horoscope: ReturnType<typeof useHoroscopeSettingsCategory>["hook"];
    user: ReturnType<typeof useUserSettingsCategory>["hook"];
  };
};

const SettingsContext = createContext<settingsContextType | null>(null);

const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const clockSettingsCategory = useClockSettingsCategory();
  const horoscopeSettingsCategory = useHoroscopeSettingsCategory();
  const userSettingsCategory = useUserSettingsCategory();

  const settings = useMemo<settingsStateType>(
    () => ({
      groups: [
        clockSettingsCategory.category,
        horoscopeSettingsCategory.category,
        userSettingsCategory.category,
      ],
    }),
    [
      clockSettingsCategory.category,
      horoscopeSettingsCategory.category,
      userSettingsCategory.category,
    ]
  );

  return (
    <SettingsContext.Provider
      value={{
        state: settings,
        hooks: {
          clock: clockSettingsCategory.hook,
          horoscope: horoscopeSettingsCategory.hook,
          user: userSettingsCategory.hook,
        },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

export const useAppSettings = () => {
  return useContext(SettingsContext)?.state as settingsStateType;
};

export const useClockSettings = () => {
  return useContext(SettingsContext)?.hooks?.clock;
};

export const useHoroscopeSettings = () => {
  return useContext(SettingsContext)?.hooks?.horoscope;
};

export const useUserSettings = () => {
  return useContext(SettingsContext)?.hooks?.user;
};
