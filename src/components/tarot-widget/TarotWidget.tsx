import styles from "./style.module.scss";
import TarotCard from "../tarot-card/TarotCard";
import { useTranslation } from "next-i18next";
import { useEffect, useState, useMemo, SyntheticEvent, useRef } from "react";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import {
  useGetAllCardsQuery,
  TarotCardType,
  TarotData,
} from "@/apis/tarot.api";
import { SwitchTransition, Transition } from "react-transition-group";
import SmoothResizeBlock from "../smooth-resize-block/SmoothResizeBlock";

const TarotWidget = () => {
  const TRANSITION_TIMEOUT = 300;

  const { t } = useTranslation();

  const {
    data: cardsData,
    error,
    isLoading,
    isSuccess,
  } = useGetAllCardsQuery();

  const cards = useMemo<TarotCardType[] | null>(
    () => (isSuccess ? (cardsData as TarotData[])[0].cards : null),
    [isSuccess]
  );

  const [randomCard, setRandomCard] = useState<TarotCardType | null>(null);
  const [cardReversed, setCardReversed] = useState<boolean>(false);

  useEffect(() => {
    if (cards) {
      const randIndex = Math.round(Math.random() * cards.length);
      setRandomCard(cards[randIndex]);
      setCardReversed(Math.random() > 0.5);
    }
  }, [cards]);

  const [widgetState, setWidgetState] = useState<"start" | "card">("start");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setWidgetState("card");
  };
  useEffect(() => {
    if (randomCard) {
      console.log(randomCard);
    }
  }, [randomCard]);

  return (
    <WidgetWrapper>
      <SmoothResizeBlock timeout={TRANSITION_TIMEOUT}>
        <SwitchTransition>
          <Transition
            mountOnEnter={widgetState === "card"}
            unmountOnExit
            timeout={TRANSITION_TIMEOUT}
            key={widgetState}
          >
            {(s: string) =>
              widgetState === "start" ? (
                <div
                  className={
                    styles["tarot-widget-start"] + " " + styles["tarot-widget"]
                  }
                  style={{
                    transition: `${TRANSITION_TIMEOUT}ms opacity`,
                    opacity: s === "entered" || s === "entering" ? 1 : 0,
                  }}
                >
                  <h2 className={styles["tarot-widget-start__title"]}>
                    {t("tarot-widget.start-title")}
                  </h2>
                  <div className={styles["tarot-widget-start__text"]}>
                    {t("tarot-widget.start-text")}
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className={styles["tarot-widget-start-form"]}
                  >
                    <input
                      type="text"
                      name="tarot-widget-start__form-input"
                      className={styles["tarot-widget-start__form-input"]}
                      placeholder={t("tarot-widget.input")}
                    />
                    <button
                      type="submit"
                      className={styles["tarot-widget-start__submit-btn"]}
                    >
                      {t("tarot-widget.submit-btn")}
                    </button>
                  </form>
                </div>
              ) : widgetState === "card" ? (
                <div
                  className={
                    styles["tarot-widget-card"] + " " + styles["tarot-widget"]
                  }
                  style={{
                    transition: `${TRANSITION_TIMEOUT}ms opacity`,
                    opacity: s === "entered" || s === "entering" ? 1 : 0,
                  }}
                >
                  <div className={styles["tarot-widget-card-wrapper"]}>
                    <TarotCard
                      img={{
                        src: randomCard?.img as string,
                        alt: randomCard?.name as string,
                      }}
                      reversed={cardReversed}
                    />
                  </div>

                  <div className={styles["tarot-widget-card-text"]}>
                    <h2 className={styles["tarot-widget-card__title"]}>
                      {randomCard?.name}{" "}
                      {cardReversed && t("tarot-widget.card-reversed")}
                    </h2>
                    <h3 className={styles["tarot-widget-card__subtitle"]}>
                      {t("tarot-widget.meanings")}
                    </h3>
                    <ul className={styles["tarot-widget-card__description"]}>
                      {randomCard?.meanings[
                        cardReversed ? "shadow" : "light"
                      ].map((i: string) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )
            }
          </Transition>
        </SwitchTransition>
      </SmoothResizeBlock>
    </WidgetWrapper>
  );
};

export default TarotWidget;
