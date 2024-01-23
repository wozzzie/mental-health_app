import * as Yup from "yup";
import { UserCredential } from "firebase/auth";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { RingLoader } from "react-spinners";
import Link from "next/link";
import Router from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ROUTES from "../../../constants/routes";
import { getAuthError } from "../../../utils/helpers";
import PageContainer from "../../page-container/pageContainer";
import { ErrorBoundaryWithMessage } from "../../error-boundary/errorBoundary";
import Checkbox from "../../checkbox/Checkbox";
import LandingButton from "../../landing-button/LandingButton";
import Divider from "@/components/divider/Divider";

import styles from "../style.module.scss";

interface Props {
  authCallback: (email: string, password: string) => Promise<UserCredential>;
  page: "SIGN_IN";
}

const SignInController = ({ authCallback, page }: Props) => {
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
    setLoading(true);
    try {
      await authCallback(email, password);
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
          <h3 className={styles["form__title"]} style={{ textAlign: "center" }}>
            {t("sign.sign-in")}
          </h3>

          <form className={styles["form"]} onSubmit={onSubmit}>
            {loading ? (
              <div className={styles["form__loading"]}>
                <RingLoader loading={loading} color={"#FFC75F"} />
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
                <div className={styles["form__error-block"]}>
                  <input
                    className={styles["form__input"]}
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder={t("sign.password") || ""}
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
              </div>
            </div>
            <div className={styles["form__agree"]}>
              <ErrorBoundaryWithMessage>
                <Checkbox
                  label={t("sign.agree")}
                  isChecked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </ErrorBoundaryWithMessage>
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
            <div className={styles["form__divider"]}>
              <ErrorBoundaryWithMessage>
                <Divider />
              </ErrorBoundaryWithMessage>
            </div>
            <p className={styles["form__account"]}>
              {t("sign.account-false")}
              <Link
                className={styles["form__link"]}
                data-testid="login-link"
                href={ROUTES.SIGN_UP}
              >
                {t("sign.sign-up")}!
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PageContainer>
  );
};

export default SignInController;
