import { ImageType, LoadingStatus } from "@/types/types";
import { useMemo, useState } from "react";

const useKittenGifs = () => {
  const [status, setStatus] = useState<LoadingStatus>("start");

  const updateGif = () => {};

  const gif = useMemo<ImageType>(
    () => ({
      src: "",
      alt: "",
    }),
    []
  );

  return {
    gif,
    status,
    updateGif,
  };
};

export default useKittenGifs;
