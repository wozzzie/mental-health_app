import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "../link/Link";
import Image from "next/image";

import { logout } from "../../firebase/firebaseClient";
import ROUTES from "../../constants/routes";
import { useAuth } from "../auth/authProvider";
import Button from "../button/Button";
import LandingButton from "../landing-button/LandingButton";
// import LanguageSwitcher from "../languageSwitcher";

import styles from "./style.module.scss";
import PageContainer from "../page-container/pageContainer";
import Divider from "../divider/Divider";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import { ErrorBoundaryWithMessage } from "../error-boundary/errorBoundary";

const Header = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    logout();
    router.push(ROUTES.WELCOME);
  };

  const handleSignUp = () => {
    router.push(ROUTES.SIGN_UP)
  }

  const handleSignIn = () => {
    router.push(ROUTES.SIGN_IN)
  }

  return (
    // <div
    //   className={styles.header}
    // >
    //   <Link href={ROUTES.WELCOME}>
    //     <Image
    //       className={styles["header__logo"]}
    //       src="/logo.png"
    //       alt="logo"
    //       width={40}
    //       height={40}
    //     />
    //   </Link>
    //   <div className={styles["header__btns"]}>
    //     {/* <LanguageSwitcher /> */}
    //     {!user ? (
    //       <Button
    //         type="button"
    //         onClick={() => router.push(ROUTES.SIGN_IN)}
    //         text={`${t("header.btn-signin")} / ${t("header.btn-signup")}`}
    //         // iconProps={{ src: "/log-in.png", alt: "log-in icon", size: 32 }}
    //         testId="login-btn"
    //       />
    //     ) : user && user && router.pathname !== ROUTES.APP ? (
    //       <>
    //         <Button
    //           type="button"
    //           onClick={handleSignOut}
    //           text={t("header.btn-signout")}
    //           iconProps={{ src: "/log-in.png", alt: "log-out icon", size: 24 }}
    //         />
    //         <Button
    //           type="button"
    //           onClick={() => router.push(ROUTES.APP)}
    //           text={t("header.btn-app-page")}
    //           iconProps={{ src: "/home.png", alt: "home icon", size: 24 }}
    //         />
    //       </>
    //     ) : (
    //       <Button
    //         type="button"
    //         onClick={handleSignOut}
    //         text={t("header.btn-signout")}
    //         iconProps={{ src: "/log-out.svg", alt: "log-out icon", size: 24 }}
    //       />
    //     )}
    //   </div>
    // </div>
    <>
      <header className={styles["top-navigation"]}>
            <PageContainer flex classes={styles["top-navigation-wrapper"]}>
            <Image src="/logo.svg" alt="Balance" className={styles["top-navigation__logo"]} width={298} height={50}/>
            <nav className={styles["top-navigation-menu"]}>
              <Link href="#" text={t("header.link-home")}/>
              <Link href="#" text={t("header.link-features")}/>
              <Link href="#" text={t("header.link-blog")}/>
              <ErrorBoundaryWithMessage >
                <LanguageSwitcher />
              </ErrorBoundaryWithMessage>
            </nav>
            <nav className={styles["sign-buttons"]}>
              <LandingButton
                text={t("header.btn-signin")}
                type="text"
                onClick={handleSignIn}
              
                />
                <LandingButton
                text={t("header.btn-signup")}
                onClick={handleSignUp}
              
                />
            </nav>
            </PageContainer> 
            <PageContainer>
              <Divider/> 
            </PageContainer>   
      </header>
    </>
  );
};

export default Header;
