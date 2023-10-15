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

  const onSubmit = handleSubmit(async ({ email, password }) => {
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
        {/* <h2 className={styles["form__title"]}>
          <span>
            {" "}
            {t("sign.sign")}{" "}
            {page === "SIGN_IN" ? `${t("sign.in")}` : `${t("sign.up")}`}{" "}
            {t("sign.use")}
          </span>

          <Link
            className={styles["form__title_link"]}
            data-testid="welcome-link"
            href={ROUTES.WELCOME}
          >
            {t("sign.GraphiQL")}
          </Link>
        </h2> */}
        <picture>
          <img src="/logo.svg" className={styles["form__img"]} alt="sign-in" />
        </picture>
        <div className={styles["form__block"]}>
          <h3 className={styles["form__title"]}>{t("sign.sign-up")}</h3>
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
            <div className={styles["form__controls"]}>
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

              <div className={styles["form__item"]}>
                <input
                  className={styles["form__input"]}
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder={t("sign.password") || ""}
                />
                {errors.password?.message && (
                  <p className={styles["form__error"]} data-testid="auth-error">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            </div>
            <ErrorBoundaryWithMessage>
              <Checkbox
                label={t("sign.agree")}
                isChecked={isChecked}
                onChange={handleCheckboxChange}
              />
            </ErrorBoundaryWithMessage>

            <ErrorBoundaryWithMessage>
              <Button
                type="submit"
                text={
                  page === "SIGN_IN"
                    ? `${t("header.btn-signin")}`
                    : `${t("header.btn-signup")}`
                }
                iconProps={{
                  src: "/sign-in.png",
                  alt: "sign-in icon",
                  size: 32,
                }}
                testId="auth-btn"
              />
            </ErrorBoundaryWithMessage>

            <p>
              {page === "SIGN_IN" ? (
                <>
                  {t("sign.account-false")}
                  <Link data-testid="login-link" href={ROUTES.SIGN_UP}>
                    {t("header.btn-signup")}!
                  </Link>
                </>
              ) : (
                <>
                  {t("sign.account-true")}
                  <Link data-testid="login-link" href={ROUTES.SIGN_IN}>
                    {t("header.btn-signin")}!
                  </Link>
                </>
              )}
            </p>
          </form>
        </div>
      </section>
    </PageContainer>
  );
};

export default AuthView;
