import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { DraggableData, Rnd } from "react-rnd";
import { WidgetAbstraction, WidgetType } from "./ScreenSlice";
import { useEffect, useMemo } from "react";
import { openWidget, raiseWidget, changeWidgetPosition } from "./ScreenSlice";
import QuotesWidget from "../quotes-widget/QuotesWidget";

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
};

const Screen: React.FC<ScreenProps> = ({ children, className }) => {
  const classes = [styles["screen"], className].join(" ");

  const widgets = useSelector((state: any) => state.screen.widgets);

  const dispatch = useDispatch();

  const savePosition = (type: WidgetType, d: DraggableData) => {
    dispatch(changeWidgetPosition({ type, x: d.x, y: d.y }));
    console.log(d);
  };

  const widgetRender = useMemo<Array<WidgetAbstraction>>(() => {
    console.log("s");

    return widgets
      .filter((i: WidgetAbstraction) => i.active)
      .map((i: WidgetAbstraction) => (
        <Rnd
          default={{
            x: i.x,
            y: i.y,
            width: i.width,
            height: i.height,
          }}
          maxHeight={i.height}
          maxWidth={i.width}
          minHeight={i.height}
          minWidth={i.width}
          key={i.id}
          bounds="parent"
          onDragStop={(e, d) => savePosition(i.type, d)}
        >
          <div
            className={styles["autofill-block"]}
            onMouseDown={() => dispatch(raiseWidget(i.type))}
          >
            {
              // сюда вставлять виджеты
              i.type === "gif" ? (
                <>gif</>
              ) : i.type === "meditation" ? (
                <>meditation</>
              ) : i.type === "music" ? (
                <>music</>
              ) : i.type === "news" ? (
                <>news</>
              ) : i.type === "quote" ? (
                <QuotesWidget />
              ) : (
                <>default</>
              )
            }
          </div>
        </Rnd>
      ));
  }, [widgets]);

  return (
    <div className={classes}>
      {children}
      <div className={styles["widgets-container"]}>
        {" "}
        {widgetRender as unknown as React.ReactNode[]}
      </div>
    </div>
  );
};

export default Screen;
