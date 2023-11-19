import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import screenReducer from "../components/screen/ScreenSlice"
import musicReducer from "../components/music-widget/musicSlice"
import tarotReducer from "../components/tarot-widget/TarotSlice"

const store = configureStore({
  reducer: {
    screen:  screenReducer,
    music: musicReducer,
    tarot: tarotReducer
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
