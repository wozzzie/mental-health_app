import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from "next";

import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import { ErrorBoundaryWithMessage } from "@/components/error-boundary/errorBoundary"
import PolicyText from "@/components/policy-text/PolicyText";

const PolicyPage = () => {
    return (
        <>
            <ErrorBoundaryWithMessage>
                <Header/>
            </ErrorBoundaryWithMessage>
            <ErrorBoundaryWithMessage>
                <PolicyText />
            </ErrorBoundaryWithMessage>
            <ErrorBoundaryWithMessage>
                <Footer/>
            </ErrorBoundaryWithMessage>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext
  ) => {
    const { locale } = context;
    const currentLocale = locale || "defaultLocale";
  
    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ["common"])),
      },
    };
  };

export default PolicyPage