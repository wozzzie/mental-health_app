import { useTranslation } from "next-i18next";
import classes from "./style.module.scss";
import Image from "next/image";
import PageContainer from "../page-container/pageContainer";

const Meditation = () => {
    const { t } = useTranslation();

    return(
        <section className={classes["meditation"]} id="meditation">
            <PageContainer flex classes={classes["container"]}>
                <Image src="/meditation.svg" alt="meditation" className={classes["meditation__img"]} width={175} height={175}/>
                <div className={classes["meditation-text"]}>
                <h2 className={classes["meditation-text__title"]}>{t("meditation.title")}</h2>
                <div className={classes["meditation-text__description"]}>{t("meditation.description")}</div>
                </div>
            </PageContainer>
                
            
        </section>
    )


}

export default Meditation;