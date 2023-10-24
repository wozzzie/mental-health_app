import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { DraggableData, Rnd } from "react-rnd";
import { WidgetAbstraction, WidgetType, closeWidget, resizeWidget } from "./ScreenSlice";
import { useEffect, useMemo, useRef } from "react";
import { openWidget, raiseWidget, changeWidgetPosition } from "./ScreenSlice";
import QuotesWidget from "../quotes-widget/QuotesWidget";
import MusicWidget from "../music-widget/MusicWidget";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import Image from "next/image";

const WidgetView: React.FC<WidgetAbstraction> = ({x,y,width,height,type}) => {

  const dispatch = useDispatch()

  const savePosition = (type: WidgetType,d : DraggableData) => {
    dispatch(changeWidgetPosition({type,x:d.x,y:d.y}))
    console.log(d)
  }

  const sizeRef = useRef<any>();

  useEffect(() => {
    if (sizeRef.current) {
      dispatch(resizeWidget({
        type:type,
        width:sizeRef.current.clientWidth,
        height: sizeRef.current.clientHeight
      }))
    }
  },[sizeRef?.current?.clientHeight, sizeRef?.current?.clientWidth])

  return (
    <Rnd
          default={{
            x: x,
            y: y,
            width: width,
            height: height,
          }}
          maxHeight={height}
          maxWidth={width}
          minHeight={height}
          minWidth={width}
          bounds="parent"
          onDragStop={(e,d)=>savePosition(type,d)}
          style={{
            overflow: "hidden",
          }}
        >
          <div 
            className={styles["autofill-block"]}
            onMouseDown={() => dispatch(raiseWidget(type))}
            ref={sizeRef}
            >
            <WidgetWrapper className={styles["widget-wrapper"]}>
            <div className={styles["widget-control"]}>
              <button onClick={()=>dispatch(closeWidget(type))}>
                <Image src="/close.svg" alt="close" width={15} height={15}/>
              </button>
            </div>
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
          width={i.width}
          height={i.height}
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
