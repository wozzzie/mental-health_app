import { createSlice } from "@reduxjs/toolkit";

type TarotState  = {

}

const initialState : TarotState = {
  
};

export const tarotSlice = createSlice({
  name: "tarot",
  initialState: initialState,
  reducers: {

  }
    
});

export const {  

} = tarotSlice.actions

export default tarotSlice.reducer;
