import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  meanings: { // <- 
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

export const fetchCards = createAsyncThunk(
  "tarot/fetchCards",
  async () => {
    const response = await fetch("http://localhost:3001/api/tarotcards", {
      method: "GET",
    });
    return response.json()
  }
)

type TarotState  = {
  cardfetchState: "loading" | "fulfilled" | "error" | "none";
  cardsData: object | null
}

const initialState : TarotState = {
  cardfetchState: "none",
  cardsData: null
};

export const tarotSlice = createSlice({
  name: "tarot",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.cardfetchState = "loading"
    })
    .addCase(fetchCards.fulfilled, (state, {payload}) => {
      state.cardfetchState = "fulfilled"
      state.cardsData = payload
    })
    .addCase(fetchCards.rejected, (state, {payload}) => {
      console.error("cards fetch error")
      throw payload;
    })

  }
    
});

export const {  

} = tarotSlice.actions

export default tarotSlice.reducer;
