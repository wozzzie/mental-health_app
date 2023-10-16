import { useTranslation } from "next-i18next"
import classes from "./style.module.scss"
import PageContainer from "../page-container/pageContainer";


const Features = () => {

    const { t } = useTranslation();

    return (
        <section className={classes["features"]} id="features">
            <PageContainer>
                <h2 className={classes["features__title"]}>{t("features.title")}</h2>
                <div className={classes["features-list"]}>
                <div className={classes["features-element"]}>
                    <h3 className={classes["features-element__title"]}>{t("features.element-title-1")}</h3>
                    <div className={classes["features-element__description"]}>{t("features.element-description-1")}</div>
                </div>
                <div className={classes["features-element"]}>
                    <h3 className={classes["features-element__title"]}>{t("features.element-title-2")}</h3>
                    <div className={classes["features-element__description"]}>{t("features.element-description-2")}</div>
                </div>
                <div className={classes["features-element"]}>
                    <h3 className={classes["features-element__title"]}>{t("features.element-title-3")}</h3>
                    <div className={classes["features-element__description"]}>{t("features.element-description-3")}</div>
                </div>
                </div>
            </PageContainer>
        </section>
    )
}


export default Features;