import nookies from "nookies";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { registerWithEmailAndPassword } from "../../firebase/firebaseClient";
import { firebaseAdmin } from "../../firebase/firebaseAdmin";
import ROUTES from "../../constants/routes";
import { ErrorBoundaryWithMessage } from "../../components/error-boundary/errorBoundary";
import SignUpController from "../../components/auth/sign-up";
import { updateProfile } from "firebase/auth";

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

const SignUp = () => {
  const onSignUp = async (email: string, password: string, name: string) => {
    console.log("authCallback called with", email);
    try {
      const result = await registerWithEmailAndPassword(email, password, name);

      console.log("Registration success:", result);
      return result;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return (
    <ErrorBoundaryWithMessage>
      <SignUpController authCallback={onSignUp} page="SIGN_UP" />
    </ErrorBoundaryWithMessage>
  );
};

export default SignUp;
