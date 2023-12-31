import { FC, ReactNode, useEffect, useRef, useState } from "react";

import styles from "./style.module.scss";

type Props = {
  children: ReactNode;
  timeout?: number;
};

const SmoothResizeBlock: FC<Props> = ({ children, timeout = 300 }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);

  type WidgetSize = {
    width: number | "auto";
    height: number | "auto";
  };

  const [widgetSize, setWidgetSize] = useState<WidgetSize>({
    width: "auto",
    height: "auto",
  });

  useEffect(() => {
    if (!divRef.current) return;
    setWidgetSize({
      width: divRef.current?.scrollWidth as number,
      height: divRef.current?.scrollHeight as number,
    });
    const resizeObserver = new MutationObserver(() => {
      console.log("resize");
      setWidgetSize({
        width: innerDivRef.current?.scrollWidth as number,
        height: innerDivRef.current?.scrollHeight as number,
      });
    });
    resizeObserver.observe(divRef.current, {
      childList: true,
      subtree: true,
    });
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      className={styles["smooth-resize-block"]}
      ref={divRef}
      style={{
        transition: `${timeout}ms height, ${timeout}ms width`,
        height: widgetSize.height,
        width: widgetSize.width,
        boxSizing: "content-box",
      }}
    >
      <div ref={innerDivRef}>{children}</div>
    </div>
  );
};

export default SmoothResizeBlock;
