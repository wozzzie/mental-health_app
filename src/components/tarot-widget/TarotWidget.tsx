import styles from "./style.module.scss";
import TarotCard from "../tarot-card/TarotCard";
import { useTranslation } from "next-i18next";

const TarotWidget = () => {

    const { t } = useTranslation()

    

    return (
        <div className={styles["tarot-widget"]}>
            <div className={styles["tarot-widget-control"]}>
                <h3>{ t("tarot.title") }</h3>
            </div>
        </div>
    )
}

export default TarotWidget