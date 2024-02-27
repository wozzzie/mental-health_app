import { useAuth } from "@/components/auth/authProvider";
import { User, updatePassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { settingsGroup } from "../settingsProvider";
import DeleteAccountSetting from "@/components/delete-account-setting/DeleteAccountSetting";
import ChangePasswordSetting from "@/components/change-password-setting/ChangePasswordSetting";

const useUserSettingsCategory = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [dep, update] = useState<boolean>(false);
  const updateUserName = (newName: string) => {
    if (user)
      updateProfile(user, { displayName: newName }).then(() =>
        update((s) => !s)
      );
    else throw new Error("No user detected for profile update");
  };

  const validateUserName = (s: string) => {
    if (s.length < 2)
      return {
        isOk: false,
        message: "name-min",
      };
    else if (s.length > 12)
      return {
        isOk: false,
        message: "name-max",
      };
    else
      return {
        isOk: true,
        message: "name-success",
      };
  };

  const changeLanguage = (locale: string) => {
    const { pathname, query } = router;

    router.push({ pathname, query }, undefined, { locale });
  };

  const category = useMemo<settingsGroup>(() => {
    const username = user?.displayName as string;
    return {
      name: "user",
      settings: [
        {
          name: "change-username",
          type: "form",
          defaultValue: username,
          callback: updateUserName,
          validate: validateUserName,
        },
        {
          name: "change-language",
          type: "select-form",
          selectedValue: router.locale as string,
          // languageNames.get(locale as string) || (locale as string),
          valueVariants: router.locales
            ?.filter((l) => l !== "default")
            .map(
              (locale) => locale
              //languageNames.get(locale as string) || (locale as string)
            ) as string[],
          callback: changeLanguage,
        },
        {
          type: "controlled",
          name: "change-password",
          component: <ChangePasswordSetting />,
        },
        {
          type: "controlled",
          name: "delete-account",
          component: <DeleteAccountSetting />,
        },
      ],
    };
  }, [router.locale, user?.displayName as string, user, dep]);

  const deleteUser = () => {
    if (user) {
      user.delete().then(() => {
        router.replace(router.asPath);
      });
    }
  };

  const updateUserPassword = (newPassword: string) => {
    updatePassword(user as User, newPassword);
  };

  return {
    category,
    hook: {
      updateUserName,
      changeLanguage,
    },
  };
};

export default useUserSettingsCategory;
