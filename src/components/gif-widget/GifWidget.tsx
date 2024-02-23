import { FC, useLayoutEffect, useState } from "react";
import styles from "./style.module.scss";
import useKittenGifs from "@/hooks/kittenGifs.hook";
import { useGetGifQuery } from "@/apis/gif.api";
import Image from "next/image";
import WidgetWrapper from "../widget-wrapper/WidgetWrapper";
import useGif from "@/hooks/gif.hook";

const GifWidget: FC<{}> = () => {
  const { data, isFetching, isError, refetch } = useGif();

  const [gifIndex, setGifIndex] = useState<number>(0);

  useLayoutEffect(() => {
    setGifIndex(Math.floor(Math.random() * 50));
  }, []);

  return (
    <WidgetWrapper className={styles["gif"]}>
      {isFetching ? (
        "loading..."
      ) : isError ? (
        "error!"
      ) : data ? (
        <Image
          className={styles["gif__image"]}
          src={data[gifIndex].url as string}
          alt={"Another cat gif"}
          width={200}
          height={200}
        />
      ) : (
        ""
      )}
    </WidgetWrapper>
  );
};

export default GifWidget;
