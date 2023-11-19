import styles from "./style.module.scss";
import TarotCard from "../tarot-card/TarotCard";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TarotCardType, fetchCards } from "./TarotSlice";
import { useEffect, useState } from "react"
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";

const TarotWidget = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch();



    const cards = useSelector((s) => s.tarot.cardsData)

    const cardfetchState = useSelector((s) => s.tarot.cardfetchState)

    const [randomCard, setRandomCard] = useState<TarotCardType | null>(null);
    
    useEffect(() => {
        dispatch(fetchCards())
    }, [])

    useEffect(() => {
        if (cardfetchState === "fulfilled") {
            const rNum = Math.floor(Math.random()*cards[0].cards.length);
            setRandomCard(cards[0].cards[rNum])
            console.log(cards)
        }
    }, [cardfetchState])
    

    return (
        <div className={styles["tarot-widget"]}>
            <div className={styles["tarot-widget-control"]}>
                <h3>{ t("tarot.title") }</h3>
                <WidgetWrapper className={styles["tarot-widget-card-wrapper"]}>
                    {
                        randomCard && cardfetchState === "fulfilled" ? (
                            <TarotCard img={{
                                src: randomCard.img,
                                alt: randomCard.name
                            }}/>
                        ) : "loading..."
                    }
                </WidgetWrapper>
            </div>
        </div>
    )
}

export default TarotWidget