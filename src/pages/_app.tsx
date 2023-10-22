import { FC } from "react";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthProvider } from "../components/auth/authProvider";
import { appWithTranslation } from "next-i18next";
import store from "../store/store";

import "@/styles/globals.scss";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <>
        <NextNProgress />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    </AuthProvider>
  );
};

export default appWithTranslation(App);
