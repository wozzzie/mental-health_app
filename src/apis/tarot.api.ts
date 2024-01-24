import serverURL from "@/constants/serverURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TarotData {
  _id: string;
  description: string;
  cards: TarotCardType[];
}

export interface TarotCardType {
  name: string; // <-
  number: string;
  arcana: string; // <-
  suit: string; // <-
  img: string; // <-
  fortune_telling: string[]; // <-
  keywords: string[];
  meanings: {
    // <-
    light: string[];
    shadow: string[];
  };
  Archetype: string;
  "Hebrew Alphabet": string;
  Numerology: string;
  Elemental: string; // <-
  "Mythical/Spiritual": string;
  "Questions to Ask": string[];
}

export const tarotApi = createApi({
  reducerPath: "tarotApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverURL + "/api/tarotcards",
  }),
  endpoints: (builder) => ({
    getAllCards: builder.query<TarotData[], void>({
      query: () => "/",
    }),
  }),
});

export const { useGetAllCardsQuery } = tarotApi;
