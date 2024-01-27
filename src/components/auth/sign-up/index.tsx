import * as Yup from "yup";
import { UserCredential } from "firebase/auth";
import { useTranslation } from "next-i18next";
import { useAuth } from "../authProvider";
import { useEffect, useState } from "react";
import ROUTES from "../../../constants/routes";
import Router from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getAuthError } from "../../../utils/helpers";
import PageContainer from "../../page-container/pageContainer";
import { ErrorBoundaryWithMessage } from "../../error-boundary/errorBoundary";
import LandingButton from "../../landing-button/LandingButton";
import Divider from "../../divider/Divider";
import { RingLoader } from "react-spinners";

import styles from "../style.module.scss";

interface Props {
  authCallback: (
    email: string,
    password: string,
    name: string
  ) => Promise<UserCredential>;
  page: "SIGN_UP";
}

const SignUpController = ({ authCallback, page }: Props) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setLoading(false);
      Router.push(ROUTES.APP);
    }
  }, [user]);

  const schema = Yup.object().shape({
    name: Yup.string()
      .required(t("validation.required") || "")
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        t("validation.name")
      )
      .min(2, t("validation.name-min"))
      .max(12, t("validation.name-max")),
    email: Yup.string()
      .required(t("validation.required") || "")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        t("validation.email") || ""
      ),
    password: Yup.string()
      .required(t("validation.required") || "")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#-_?&])[A-Za-z\d@$!%*#-_?&]{8,}$/,
        t("validation.password") || ""
      ),
    passwordRepeat: Yup.string()
      .required(t("validation.required") || "")
      .oneOf([Yup.ref("password")], t("validation.password-match") || ""),
  });

  const resolver = yupResolver(schema);
  type schemaType = Yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({ resolver });
  const [authError, setAuthError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const onSubmit = handleSubmit(
    async ({ email, password, passwordRepeat, name }) => {
      if (password !== passwordRepeat) {
        setAuthError("Passwords do not match");
        return;
      }

      setLoading(true);
      try {
        await authCallback(email, password, name);
      } catch (e) {
        const err = getAuthError(e);
        setAuthError(err);
        setLoading(false);
      }
    }
  );

  return (
    <PageContainer>
      <section className={styles["form__wrapper"]}>
        <picture>
          <img src="/logo.svg" className={styles["form__img"]} alt="sign-in" />
        </picture>
        <div className={styles["form__block"]}>
          <h3 className={styles["form__title"]} style={{ textAlign: "left" }}>
            {t("sign.account-create")}
          </h3>

          <p className={styles["form__terms"]}>{t("sign.terms")}</p>

          <form className={styles["form"]} onSubmit={onSubmit}>
            {loading ? (
              <div className={styles["form__loading"]}>
                <RingLoader loading={loading} color={"#FFC75F "} />
              </div>
            ) : null}

            {authError && (
              <p className={styles["form__error"]} data-testid="auth-error">
                {authError}
              </p>
            )}
            <div className={styles["form__controls"]}>
              <label className={styles["form__label"]}>
                {t("sign.label-name")}
              </label>

              <div className={styles["form__item"]}>
                <input
                  className={styles["form__input"]}
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder={t("sign.name") || ""}
                />
                {errors.name?.message && (
                  <p className={styles["form__error"]} data-testid="auth-error">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              <label className={styles["form__label"]}>
                {t("sign.label-email")}
              </label>

              <div className={styles["form__item"]}>
                <input
                  className={styles["form__input"]}
                  id="email"
                  type="text"
                  {...register("email")}
                  placeholder={t("sign.email") || ""}
                />
                {errors.email?.message && (
                  <p className={styles["form__error"]} data-testid="auth-error">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <label className={styles["form__label"]}>
                {t("sign.label-password")}
              </label>

              <div className={styles["form__item-signup"]}>
                <div className={styles["form__error-block"]}>
                  <input
                    className={styles["form__input"]}
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder={t("sign.password-only") || ""}
                  />

                  {errors.password?.message && (
                    <p
                      className={styles["form__error"]}
                      data-testid="auth-error"
                    >
                      {errors.password?.message}
                    </p>
                  )}
                </div>

                <div className={styles["form__error-block"]}>
                  <input
                    className={styles["form__input"]}
                    id="password-repeat"
                    type="password"
                    {...register("passwordRepeat")}
                    placeholder={t("sign.repeat-password") || ""}
                  />
                  {errors.passwordRepeat?.message && (
                    <p
                      className={styles["form__error"]}
                      data-testid="auth-error"
                    >
                      {errors.passwordRepeat?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <ErrorBoundaryWithMessage>
              <LandingButton
                type="submit"
                text={t("sign.sign-up")}
                disabled={!isChecked}
              />
            </ErrorBoundaryWithMessage>
            <div className={styles["form__divider_none"]}>
              <ErrorBoundaryWithMessage>
                <Divider />
              </ErrorBoundaryWithMessage>
            </div>
          </form>
        </div>
      </section>
    </PageContainer>
  );
};

export default SignUpController;
