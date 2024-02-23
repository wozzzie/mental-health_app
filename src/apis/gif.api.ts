import serverURL from "@/constants/serverURL";
import store from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ResponseGifObject = {
  id: string;
  media_formats: {
    gif: {
      url: string;
    };
  };
};

type GifResponse = {
  next: string;
  results: ResponseGifObject[];
};

type GifObject = {
  id: string;
  url: string;
};

type GifReturnType = GifObject[];

type GetGifQueryArgs = {};

const apiKey = process.env.NEXT_PUBLIC_FB_API;

export const gifApi = createApi({
  reducerPath: "gifApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tenor.googleapis.com/v2",
  }),
  endpoints: (builder) => ({
    getGif: builder.query<GifReturnType, null | string>({
      query: (next) => {
        return `/search?q=cat&key=${apiKey}&limit=50${
          next ? `&pos=${next}` : ""
        }`;
      },
      transformResponse: (res: GifResponse) =>
        res.results.map((i) => ({
          id: i.id,
          url: i.media_formats.gif.url,
        })),
    }),
  }),
});

export const { useGetGifQuery } = gifApi;
