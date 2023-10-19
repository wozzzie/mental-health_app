import nookies from "nookies";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { logInWithEmailAndPassword } from "../../firebase/firebaseClient";
import ROUTES from "../../constants/routes";
import { firebaseAdmin } from "../../firebase/firebaseAdmin";
import { ErrorBoundaryWithMessage } from "../../components/error-boundary/errorBoundary";
import SignInController from "../../components/auth/sign-in";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;

    return {
      redirect: {
        permanent: false,
        destination: ROUTES.APP,
      },
      props: {
        uid,
      },
    };
  } catch (err) {
    const locale = ctx.locale || "En";
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
};

const SignIn = () => {
  const onSignIn = async (email: string, password: string) => {
    return await logInWithEmailAndPassword(email, password);
  };

  return (
    <ErrorBoundaryWithMessage>
      <SignInController authCallback={onSignIn} page="SIGN_IN" />
    </ErrorBoundaryWithMessage>
  );
};

export default SignIn;
