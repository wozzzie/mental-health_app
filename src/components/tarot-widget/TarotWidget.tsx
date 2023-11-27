import styles from "./style.module.scss";
import TarotCard from "../tarot-card/TarotCard";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TarotCardType, fetchCards } from "./TarotSlice";
import { useEffect, useState } from "react";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import { AppDispatch, RootState } from "@/store/store";

const TarotWidget = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const cards = useSelector((s: RootState) => s.tarot.cardsData);

  const cardFetchState = useSelector((s: RootState) => s.tarot.cardfetchState);

  const [randomCard, setRandomCard] = useState<TarotCardType | null>(null);

  const [widgetState, setWidgetState] = useState<"start" | "card">("start");

  useEffect(() => {
    dispatch(fetchCards());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (cardFetchState === "fulfilled" && cards) {
      const rNum = Math.floor(Math.random() * cards[0].cards.length);
      setRandomCard(cards[0].cards[rNum]);
    }
    //eslint-disable-next-line
  }, [cardFetchState]);

  return (
    <div className={styles["tarot-widget"]}>
      <div className={styles["tarot-widget-control"]}>
        <h3>{t("tarot.title")}</h3>
        <WidgetWrapper className={styles["tarot-widget-card-wrapper"]}>
          {randomCard && cardFetchState === "fulfilled" ? (
            <TarotCard
              img={{
                src: randomCard.img,
                alt: randomCard.name,
              }}
            />
          ) : (
            "loading..."
          )}
        </WidgetWrapper>
      </div>
    </div>
  );
};

export default TarotWidget;
