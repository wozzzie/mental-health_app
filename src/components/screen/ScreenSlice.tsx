"use client";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import MusicWidget from "../music-widget/MusicWidget";
import QuotesWidget from "../quotes-widget/QuotesWidget";
import TarotWidget from "../tarot-widget/TarotWidget";
import HoroscopeWidget from "../horoscope-widget/Horoscope";
import ClockWidget from "../clock-widget/ClockWidget";
import BreatheAnimation from "../breathe-animation/BreatheAnimation";
import BreathWidget from "../breath-widget/BreathWidget";
import NewsWidget from "../news-widget/NewsWidget";
import GifWidget from "../gif-widget/GifWidget";
import store from "@/store/store";

export type WidgetAbstraction = {
  id: string;
  x: number;
  y: number;
  component: ReactNode;
  active: boolean;
  icon: {
    src: string;
    alt: string; // to be used in useTranslation, i.e. locale path (e.g. "tarot.widget-title", not "Tarot widget")
  };
};

interface IDInPayload {
  payload: string;
}

interface StringInPayload {
  payload: string;
}

interface WidgetAbstractionInPayload {
  payload: WidgetAbstraction;
}

type InitialStateType = {
  widgets: Array<WidgetAbstraction>;
  wallpaperWindowActive: boolean;
  settingsWindowActive: boolean;
};

type WindowDimensions = {
  width: number;
  height: number;
};

const initialState: InitialStateType = {
  widgets: [
    {
      id: "1",
      x: 0,
      y: 0,
      component: <MusicWidget />,
      active: false,
      icon: {
        src: "/music.svg",
        alt: "music",
      },
    },
    {
      id: "3",
      x: 0,
      y: 0,
      component: <GifWidget />,
      active: false,
      icon: {
        src: "/kitten.svg",
        alt: "kittens",
      },
    },
    {
      id: "4",
      x: 0,
      y: 0,
      component: <QuotesWidget />,
      active: false,
      icon: {
        src: "/quotes.svg",
        alt: "quote",
      },
    },
    {
      id: "5",
      x: 0,
      y: 0,
      component: <NewsWidget />,
      active: false,
      icon: {
        src: "/news.svg",
        alt: "news",
      },
    },
    {
      id: "6",
      x: 0,
      y: 0,
      component: <TarotWidget />,
      active: false,
      icon: {
        src: "/tarot.svg",
        alt: "tarot",
      },
    },
    {
      id: "7",
      x: 0,
      y: 0,
      component: <HoroscopeWidget />,
      active: false,
      icon: {
        src: "/horoscope.svg",
        alt: "horoscope",
      },
    },
    {
      id: "8",
      x: 0,
      y: 0,
      component: <ClockWidget />,
      active: false,
      icon: {
        src: "/clock.svg",
        alt: "clock",
      },
    },
    {
      id: "9",
      x: 0,
      y: 0,
      component: <BreathWidget />,
      active: false,
      icon: {
        src: "/breath.svg",
        alt: "breathe",
      },
    },
  ],

  wallpaperWindowActive: false,
  settingsWindowActive: false,
};

type WidgetMutatorInPayload = {
  payload: {
    x: number;
    y: number;
    id: string;
  };
};

const saveWidgets = (widgets: InitialStateType) => {
  localStorage.setItem("widgets", JSON.stringify(widgets));
  localStorage.setItem(
    "windowDimensions",
    JSON.stringify({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  );
};

export const screenSlice = createSlice({
  name: "screen",
  initialState: initialState,
  reducers: {
    closeWidget: (state, action: IDInPayload) => {
      // delete by ID
      const w = state.widgets.find((i) => i.id === action.payload);
      if (w) w.active = false;
      else console.log("close: widget not found");
      saveWidgets(state);
    },

    raiseWidget: (state, action: IDInPayload) => {
      const widgetToRaise = state.widgets.find((i) => i.id === action.payload);
      if (widgetToRaise !== undefined) {
        state.widgets = state.widgets.filter((i) => i.id !== action.payload);
        state.widgets = [...state.widgets, widgetToRaise];
      } else {
        console.log("raise: widget not found ");
      }
      saveWidgets(state);
    },

    openWidget: (state, action: IDInPayload) => {
      const w = state.widgets.find((i) => i.id === action.payload);
      if (w) w.active = true;
      else console.log("open: widget not found");
      saveWidgets(state);
    },

    toggleWidget: (state, action: IDInPayload) => {
      const w = state.widgets.find((i) => i.id === action.payload);
      if (w) w.active = !w.active;
      else console.log("toggle: widget not found");
      saveWidgets(state);
    },

    changeWidgetPosition: (state, action: WidgetMutatorInPayload) => {
      const widgetToMutate = state.widgets.find(
        (i) => i.id === action.payload.id
      );
      if (widgetToMutate) {
        widgetToMutate.x = action.payload.x;
        widgetToMutate.y = action.payload.y;
      }
      saveWidgets(state);
    },

    openWallpaperWindow: (s) => {
      s.wallpaperWindowActive = true;
      s.settingsWindowActive = false;
      saveWidgets(s);
    },

    closeWallpaperWindow: (s) => {
      s.wallpaperWindowActive = false;
      saveWidgets(s);
    },

    toggleWallpaperWindow: (s) => {
      s.wallpaperWindowActive = !s.wallpaperWindowActive;
      s.settingsWindowActive = s.wallpaperWindowActive
        ? false
        : s.settingsWindowActive;
      saveWidgets(s);
    },

    openSettingsWindow: (s) => {
      s.settingsWindowActive = true;
      s.wallpaperWindowActive = false;
      saveWidgets(s);
    },

    closeSettingsWindow: (s) => {
      s.settingsWindowActive = false;
      saveWidgets(s);
    },

    toggleSettingsWindow: (s) => {
      s.settingsWindowActive = !s.settingsWindowActive;
      s.wallpaperWindowActive = s.settingsWindowActive
        ? false
        : s.wallpaperWindowActive;
      saveWidgets(s);
    },

    getPreviousWidgetsState: (s) => {
      const previousState = JSON.parse(
        localStorage.getItem("widgets") || "{}"
      ) as InitialStateType | null;

      const previousDimensions = JSON.parse(
        localStorage.getItem("windowDimensions") || "{}"
      ) as WindowDimensions | null;

      if (
        previousState &&
        previousDimensions &&
        previousDimensions.height === window.innerHeight &&
        previousDimensions.width === window.innerWidth
      ) {
        console.log(
          JSON.parse(
            localStorage.getItem("widgets") || "{}"
          ) as WindowDimensions
        );
        s.settingsWindowActive = previousState.settingsWindowActive;
        s.wallpaperWindowActive = previousState.wallpaperWindowActive;
        const tmp = s.widgets;
        s.widgets = previousState.widgets.map((item) => ({
          ...item,
          component: s.widgets.find((i) => i.id === item.id)?.component,
        }));
      } else console.log("77777");
    },
  },
});

export const {
  closeWidget,
  raiseWidget,
  openWidget,
  changeWidgetPosition,
  toggleWidget,
  openWallpaperWindow,
  closeWallpaperWindow,
  toggleWallpaperWindow,
  toggleSettingsWindow,
  openSettingsWindow,
  closeSettingsWindow,
  getPreviousWidgetsState,
} = screenSlice.actions;

export default screenSlice.reducer;
