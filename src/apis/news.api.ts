import serverURL from "@/constants/serverURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type NewsQueryArgs = {
  lang: "en" | "ru" | "ua";
  limit?: number;
};

type NewsItem = {
  title: string;
  url: string;
  img: string;
  author: string;
  authorLogo: string;
};

type NewsResponse = NewsItem[];

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverURL + "/api/news",
  }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, NewsQueryArgs>({
      query: ({ lang, limit }) => {
        return {
          url: `?lang=${lang}${limit ? `&limit=${limit}` : ""}`,
        };
      },
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
