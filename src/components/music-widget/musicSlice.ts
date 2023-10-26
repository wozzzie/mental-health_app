import { createSlice } from '@reduxjs/toolkit'

export type musicState = {
    link: null | string
}

const initialState : musicState = {
    link: null,
}

type StringInPayload = {
  payload: string;
} 

export const musicSlice = createSlice({
  name: 'music',
  initialState: initialState,
  reducers: {
    setLink: (state, action : StringInPayload) => {
      state.link = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLink } = musicSlice.actions

export default musicSlice.reducer