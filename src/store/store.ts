import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import screenReducer from "../components/screen/ScreenSlice";
import musicReducer from "../components/music-widget/musicSlice";
import tarotReducer from "../components/tarot-widget/TarotSlice";
import { tarotApi } from "@/apis/tarot.api";
import { activeWallpaperApi } from "@/apis/active-wallpaper.api";
import { newsApi } from "@/apis/news.api";
import { gifApi } from "@/apis/gif.api";
import { clockApi } from "@/apis/clock.api";

const store = configureStore({
  reducer: {
    screen: screenReducer,
    music: musicReducer,
    tarot: tarotReducer,
    [tarotApi.reducerPath]: tarotApi.reducer,
    [activeWallpaperApi.reducerPath]: activeWallpaperApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [gifApi.reducerPath]: gifApi.reducer,
    [clockApi.reducerPath]: clockApi.reducer,
  },
  middleware: (g) =>
    g({ serializableCheck: false })
      .concat(tarotApi.middleware)
      .concat(activeWallpaperApi.middleware)
      .concat(newsApi.middleware)
      .concat(gifApi.middleware)
      .concat(clockApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
