import { useTranslation } from "next-i18next";
import styles from "./style.module.scss";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import WidgetInput from "../widget-input/WidgetInput";
import AppButton from "../app-button/AppButton";
import { Transition } from "react-transition-group";
import { useAuth } from "../auth/authProvider";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import AlertModal from "../alert-modal/AlertModal";
import { auth, firebase } from "@/firebase/firebaseClient";
import { FirebaseError } from "firebase/app";

const ChangePasswordSetting: FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [alertActive, setAlertActive] = useState<boolean>(false);
  const { user } = useAuth();
  const schema = Yup.object().shape({
    password: Yup.string()
      .required(t("validation.required"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{8,}$/,
        t("validation.password") || ""
      ),
    passwordRepeat: Yup.string()
      .required(t("validation.required"))
      .oneOf([Yup.ref("password")], t("validation.password-match") || ""),
    oldPassword: Yup.string().required(t("validation.required")),
  });

  const resolver = yupResolver(schema);
  type schemaType = Yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<schemaType>({ resolver });

  const passwordInput = watch("password");

  const showRestOfForm = useMemo(
    () => (passwordInput ? true : false),
    [passwordInput]
  );

  const onSubmit = handleSubmit(
    async ({ password, passwordRepeat, oldPassword }) => {
      try {
        if (password !== passwordRepeat) {
          throw new Error("passwords mismatch");
        }
        if (!user) {
          throw new Error("No user found");
        }
        setError(null);
        setLoading(true);

        const credential = EmailAuthProvider.credential(
          user.email as string,
          oldPassword
        );

        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, password);
        setLoading(false);
        setAlertActive(true);
        reset();
      } catch (e) {
        if (e instanceof FirebaseError && e.code === "auth/wrong-password") {
          setLoading(false);
          setError(t("settings.user.wrong-password"));
        } else if (e instanceof Error) {
          console.error(e);
          setLoading(false);
        }
      }
    }
  );

  const transitionTimeout = 300;

  return (
    <>
      <div className={styles["password__description"]}>
        {t("settings.user.change-password")}
      </div>
      <form onSubmit={onSubmit} className={styles["password__form"]}>
        {error && (
          <div
            className={
              styles["password__error"] + " " + styles["password__error_first"]
            }
          >
            {error}
          </div>
        )}
        <div className={styles["password__input"]}>
          <WidgetInput
            name={"change-password"}
            placeholder={t("sign.password-only")}
            inputProps={{
              ...register("password"),
              id: "change-password",
              type: "password",
            }}
            variant={errors.password ? "warning" : "default"}
            className={styles["password__input"]}
          />
          {errors.password && (
            <div className={styles["password__error"]}>
              {errors.password.message}
            </div>
          )}
        </div>
        <Transition timeout={transitionTimeout} in={showRestOfForm}>
          {(s) => (
            <div
              className={styles["password__hiding-part"]}
              style={{
                transition: `${transitionTimeout}ms all`,
                opacity: s === "entered" || s === "entering" ? 1 : 0,
                maxHeight: s === "entered" || s === "entering" ? 500 : 0,
              }}
            >
              <div className={styles["password__repeat-input"]}>
                <WidgetInput
                  name={"change-password-repeat"}
                  placeholder={t("sign.repeat-password")}
                  inputProps={{
                    ...register("passwordRepeat"),
                    id: "change-password-repeat",
                    type: "password",
                  }}
                  variant={errors.passwordRepeat ? "warning" : "default"}
                />
                {errors.passwordRepeat && (
                  <div className={styles["password__error"]}>
                    {errors.passwordRepeat.message}
                  </div>
                )}
              </div>
              <div className={styles["password__old-password"]}>
                <WidgetInput
                  name={"change-old-password"}
                  placeholder={t("settings.user.old-password")}
                  inputProps={{
                    ...register("oldPassword"),
                    id: "change-password-old",
                    type: "password",
                  }}
                  variant={errors.passwordRepeat ? "warning" : "default"}
                />
                {errors.passwordRepeat && (
                  <div className={styles["password__error"]}></div>
                )}
              </div>
              <AppButton type="submit">{t("settings.change")}</AppButton>
            </div>
          )}
        </Transition>
        <Transition timeout={transitionTimeout} in={loading}>
          {(s) => (
            <div
              className={styles["password__loading-block"]}
              style={{
                opacity: s === "entered" || s === "entering" ? 1 : 0,
                zIndex: s === "entered" || s === "entering" ? 1 : -1,
                transition: `${transitionTimeout}ms all`,
              }}
            >
              <div>{t("settings.user.password-update")}</div>
            </div>
          )}
        </Transition>
      </form>
      <AlertModal
        active={alertActive}
        descriptionText={t("settings.user.password-success")}
        onClick={() => setAlertActive(false)}
      />
    </>
  );
};

export default ChangePasswordSetting;
