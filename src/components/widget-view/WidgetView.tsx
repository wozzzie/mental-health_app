import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { DraggableData, Rnd } from "react-rnd";
import Image from "next/image";

import {
  WidgetAbstraction,
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
import TarotCard from "../tarot-card/TarotCard";
import ClockWidget from "../clock-widget/ClockWidget";

type IncludesTransitionState = {
  transitionState: string;
  transitionTimeout: number;
};

const WidgetView: React.FC<WidgetAbstraction & IncludesTransitionState> = ({
  x,
  y,
  component,
  transitionState: s,
  transitionTimeout,
  icon,
  id,
}) => {
  const dispatch = useDispatch();

  const savePosition = (id: string, d: DraggableData) => {
    dispatch(changeWidgetPosition({ id, x: d.x, y: d.y }));
  };

  return (
    <Rnd
      default={{
        x: x,
        y: y,
        width: "auto",
        height: "auto",
      }}
      bounds="parent"
      onDragStop={(e, d) => savePosition(id, d)}
      style={{
        overflow: "hidden",
        transition: `${transitionTimeout}ms opacity`,
        opacity: s === "entered" || s === "entering" ? 1 : 0,
      }}
      enableResizing={false}
    >
      <div
        className={styles["autofill-block"]}
        onMouseDown={() => dispatch(raiseWidget(id))}
      >
        <WidgetWrapper hideOnBlur className={styles["widget-wrapper"]}>
          <div className={styles["widget-control"]}>
            <button onClick={() => dispatch(closeWidget(id))}>
              <Image src="/close.svg" alt="close" width={15} height={15} />
            </button>
          </div>
          {component}
        </WidgetWrapper>
      </div>
    </Rnd>
  );
};

export default WidgetView;
