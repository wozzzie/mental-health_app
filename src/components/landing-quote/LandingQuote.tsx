import classes from "./style.module.scss";
import PageContainer from "../page-container/pageContainer";
import Divider from "../divider/Divider";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const LandingQuote = () => {
  const { t } = useTranslation();

  return (
    <section className={classes["quote"]}>
      <PageContainer>
        <Divider />
        <div className={classes["quote-wrapper"]}>
          <Image
            src="/quote-symbol.png"
            alt="quote symbol"
            width={38}
            height={26}
          />
          <div className={classes["quote-wrapper__text"]}>
            {t("quote.text")}
          </div>

          <div className={classes["quote-wrapper-author"]}>
            <div className={classes["quote-wrapper-author__name"]}>
              {t("quote.user")}
            </div>
          </div>
        </div>

        <Divider />
      </PageContainer>
    </section>
  );
};

export default LandingQuote;
