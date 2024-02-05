import { FC } from "react";
import styles from "./style.module.scss";
import useKittenGifs from "@/hooks/kittenGifs.hook";

const GifWidget: FC<{}> = () => {
  const { gif, status, updateGif } = useKittenGifs();

  return <></>;
};

export default GifWidget;
