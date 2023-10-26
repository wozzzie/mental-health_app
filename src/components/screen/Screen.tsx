import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { DraggableData, Rnd } from "react-rnd";
import { WidgetAbstraction, WidgetType, closeWidget } from "./ScreenSlice";
import { useLayoutEffect, useMemo, useRef } from "react";
import { openWidget, raiseWidget, changeWidgetPosition } from "./ScreenSlice";
import QuotesWidget from "../quotes-widget/QuotesWidget";
import MusicWidget from "../music-widget/MusicWidget";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import Image from "next/image";
import { useEffect } from "react";


const WidgetView: React.FC<WidgetAbstraction> = ({x,y,type}) => {

  const dispatch = useDispatch()

  const savePosition = (type: WidgetType,d : DraggableData) => {
    dispatch(changeWidgetPosition({type,x:d.x,y:d.y}))
  }


  const child = (<>
    { // сюда вставлять виджеты
              type === "gif" ? (
                <>
                  gif
                </>
              ) : type === "meditation" ? (
                <>
                  meditation
                </>
              ) : type === "music" ? (
                <>
                  <MusicWidget/>
                </>
              ) : type === "news" ? (
                <>
                  news
                </>
              ) : type === "quote" ? (
                <>
                 <QuotesWidget/>
                </>
              ) : (
                <>
                  default
                </>
              )
            }
  </>)

  return (
    <Rnd
          default={{
            x: x,
            y: y
          }}
          bounds="parent"
          onDragStop={(e,d)=>savePosition(type,d)}
          style={{
            overflow: "hidden",
          }}
          enableResizing={false}
        >
          <div 
            className={styles["autofill-block"]}
            onMouseDown={() => dispatch(raiseWidget(type))}
            >
            <WidgetWrapper className={styles["widget-wrapper"]}>
            <div className={styles["widget-control"]}>
              <button onClick={()=>dispatch(closeWidget(type))}>
                <Image src="/close.svg" alt="close" width={15} height={15}/>
              </button>
            </div>
            {child}
            </WidgetWrapper>
          </div>
        </Rnd>
  );
}

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
};

const Screen: React.FC<ScreenProps> = ({ children, className }) => {
  const classes = [styles["screen"], className].join(" ");

  const widgets = useSelector((state: any) => state.screen.widgets);

  const dispatch = useDispatch();

  const widgetRender = useMemo(() => (
    widgets
      .filter((i : WidgetAbstraction) => i.active)
      .map((i : WidgetAbstraction) => (
        <WidgetView 
          key={i.id}
          x={i.x}
          y={i.y}
          id={i.id}
          active={i.active}
          type={i.type}
          />
    ))
  ), [widgets])

  return (
    <div className={classes}>
      {children}
      <div className={styles["widgets-container"]}>
        {widgetRender}
      </div>
    </div>
  );
};

export default Screen;
