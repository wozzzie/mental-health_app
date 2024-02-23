import { useGetGifQuery } from "@/apis/gif.api";
import { LoadingStatus } from "@/types/types";
import { useEffect, useRef, useState } from "react";

const useGif = () => {
  const next = useRef<string | null>(null);
  const query = useGetGifQuery(next.current);
  return query;
};

export default useGif;
