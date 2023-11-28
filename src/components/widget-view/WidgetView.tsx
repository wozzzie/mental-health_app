import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { DraggableData, Rnd } from "react-rnd";
import Image from "next/image";

import {
  WidgetAbstraction,
  WidgetType,
  changeWidgetPosition,
  raiseWidget,
  closeWidget,
} from "../screen/ScreenSlice";
import MusicWidget from "../music-widget/MusicWidget";
import TarotWidget from "../tarot-widget/TarotWidget";
import QuotesWidget from "../quotes-widget/QuotesWidget";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";

import styles from "./style.module.scss";
import { Transition } from "react-transition-group";

type IncludesTransitionState = {
  transitionState: string;
  transitionTimeout: number;
};

const WidgetView: React.FC<WidgetAbstraction & IncludesTransitionState> = ({
  x,
  y,
  type,
  transitionState: s,
  transitionTimeout,
}) => {
  const dispatch = useDispatch();

  const savePosition = (type: WidgetType, d: DraggableData) => {
    dispatch(changeWidgetPosition({ type, x: d.x, y: d.y }));
  };

  const child = (
    <>
      {
        // сюда вставлять виджеты
        type === "gif" ? (
          <></>
        ) : type === "meditation" ? (
          <>meditation</>
        ) : type === "music" ? (
          <>
            <MusicWidget />
          </>
        ) : type === "news" ? (
          <>
            <TarotWidget />
          </>
        ) : type === "quote" ? (
          <>
            <QuotesWidget />
          </>
        ) : (
          <>default</>
        )
      }
    </>
  );

  return (
    <Rnd
      default={{
        x: x,
        y: y,
      }}
      bounds="parent"
      onDragStop={(e, d) => savePosition(type, d)}
      style={{
        overflow: "hidden",
        transition: `${transitionTimeout}ms opacity`,
        opacity: s === "entered" || s === "entering" ? 1 : 0,
      }}
      enableResizing={false}
    >
      <div
        className={styles["autofill-block"]}
        onMouseDown={() => dispatch(raiseWidget(type))}
      >
        <WidgetWrapper className={styles["widget-wrapper"]}>
          <div className={styles["widget-control"]}>
            <button onClick={() => dispatch(closeWidget(type))}>
              <Image src="/close.svg" alt="close" width={15} height={15} />
            </button>
          </div>
          {child}
        </WidgetWrapper>
      </div>
    </Rnd>
  );
};

export default WidgetView;
