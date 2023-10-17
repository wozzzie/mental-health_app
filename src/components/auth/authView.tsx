import * as Yup from "yup";
import Router from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserCredential } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { RingLoader } from "react-spinners";
import PageContainer from "../../components/page-container/pageContainer";
import ROUTES from "../../constants/routes";
import Button from "../button/Button";
import { getAuthError } from "../../utils/helpers";

import styles from "./style.module.scss";
import { ErrorBoundaryWithMessage } from "../error-boundary/errorBoundary";
import Checkbox from "../checkbox/Checkbox";
import LandingButton from "../landing-button/LandingButton";
import Divider from "../divider/divider";

interface Props {
  authCallback: (email: string, password: string) => Promise<UserCredential>;
  page: "SIGN_IN" | "SIGN_UP";
}

const AuthView = ({ authCallback, page }: Props) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
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

  const onSubmit = handleSubmit(async ({ email, password, passwordRepeat }) => {
    if (password !== passwordRepeat) {
      setAuthError("Passwords do not match");
      return;
    }
    console.log("2");

    setLoading(true);
    try {
      await authCallback(email, password);
      console.log("1");
      setLoading(false);
      Router.push(ROUTES.APP);
    } catch (e) {
      const err = getAuthError(e);
      setAuthError(err);
      setLoading(false);
    }
  });

  const handleCheckboxChange = (newChecked: boolean) => {
    setIsChecked(newChecked);
  };

  return (
    <PageContainer>
      <section className={styles["form__wrapper"]}>
        <picture>
          <img src="/logo.svg" className={styles["form__img"]} alt="sign-in" />
        </picture>
        <div className={styles["form__block"]}>
          <h3
            className={styles["form__title"]}
            style={{ textAlign: page === "SIGN_IN" ? "center" : "left" }}
          >
            {page === "SIGN_IN"
              ? `${t("sign.sign-in")}`
              : `${t("sign.account-create")}`}
          </h3>

          {page === "SIGN_IN" ? (
            ""
          ) : (
            <p className={styles["form__terms"]}>{t("sign.terms")}</p>
          )}

          <form className={styles["form"]} onSubmit={onSubmit}>
            {loading ? (
              <div className={styles["form__loading"]}>
                <RingLoader loading={loading} color={"#a359ff"} />
              </div>
            ) : null}

            {authError && (
              <p className={styles["form__error"]} data-testid="auth-error">
                {authError}
              </p>
            )}
            <div
              className={`${styles["form__controls"]} ${
                page === "SIGN_IN" ? styles["form__controls_signin"] : ""
              }`}
            >
              {page === "SIGN_IN" ? (
                ""
              ) : (
                <label className={styles["form__label"]}>
                  {t("sign.label-email")}
                </label>
              )}
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
              {page === "SIGN_IN" ? (
                ""
              ) : (
                <label className={styles["form__label"]}>
                  {t("sign.label-password")}
                </label>
              )}

              <div
                className={
                  page === "SIGN_IN"
                    ? styles["form__item"]
                    : styles["form__item-signup"]
                }
              >
                <div className={styles["form__error-block"]}>
                  <input
                    className={styles["form__input"]}
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder={
                      page === "SIGN_UP"
                        ? t("sign.password-only") || ""
                        : t("sign.password") || ""
                    }
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

                {page === "SIGN_IN" ? (
                  ""
                ) : (
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
                )}
              </div>
            </div>
            <div
              className={`${page === "SIGN_IN" ? styles["form__agree"] : ""}`}
            >
              {" "}
              {page === "SIGN_IN" ? (
                <ErrorBoundaryWithMessage>
                  <Checkbox
                    label={t("sign.agree")}
                    isChecked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </ErrorBoundaryWithMessage>
              ) : null}
            </div>
            <ErrorBoundaryWithMessage>
              <LandingButton
                type="submit"
                text={
                  page === "SIGN_IN"
                    ? `${t("sign.account-signin")}`
                    : `${t("sign.sign-up")}`
                }
                disabled={!isChecked}
              />
            </ErrorBoundaryWithMessage>
            <div
              className={`${
                page === "SIGN_IN"
                  ? styles["form__divider"]
                  : styles["form__divider_none"]
              }`}
            >
              <ErrorBoundaryWithMessage>
                <Divider />
              </ErrorBoundaryWithMessage>
            </div>
            <p
              className={`${page === "SIGN_IN" ? styles["form__account"] : ""}`}
            >
              {page === "SIGN_IN" ? (
                <>
                  {t("sign.account-true")}
                  <Link
                    className={styles["form__link"]}
                    data-testid="login-link"
                    href={ROUTES.SIGN_UP}
                  >
                    {t("sign.sign-up")}!
                  </Link>
                </>
              ) : null}
            </p>
          </form>
        </div>
      </section>
    </PageContainer>
  );
};

export default AuthView;
