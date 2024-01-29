import { createSlice, nanoid } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import MusicWidget from "../music-widget/MusicWidget";
import QuotesWidget from "../quotes-widget/QuotesWidget";
import TarotWidget from "../tarot-widget/TarotWidget";
import HoroscopeWidget from "../horoscope-widget/Horoscope";
import ClockWidget from "../clock-widget/ClockWidget";

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
        alt: "Music",
      },
    },
    {
      id: "2",
      x: 0,
      y: 0,
      component: <>meditation</>,
      active: false,
      icon: {
        src: "/meditation.svg",
        alt: "Meditation",
      },
    },
    {
      id: "3",
      x: 0,
      y: 0,
      component: <></>,
      active: false,
      icon: {
        src: "/gif-widget.svg",
        alt: "Kittens",
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
        alt: "Daily Quote",
      },
    },
    {
      id: "5",
      x: 0,
      y: 0,
      component: <>News</>,
      active: false,
      icon: {
        src: "/news.svg",
        alt: "News",
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
        alt: "Tarot",
      },
    },
    {
      id: "7",
      x: 0,
      y: 0,
      component: <HoroscopeWidget />,
      active: false,
      icon: {
        src: "/tarot.svg",
        alt: "Horoscope",
      },
    },
    {
      id: "8",
      x: 0,
      y: 0,
      component: <ClockWidget />,
      active: false,
      icon: {
        src: "/tarot.svg",
        alt: "Clock",
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

export const screenSlice = createSlice({
  name: "screen",
  initialState: initialState,
  reducers: {
    closeWidget: (state, action: IDInPayload) => {
      // delete by ID
      const w = state.widgets.find((i) => i.id === action.payload);
      if (w) w.active = false;
      else console.log("close: widget not found");
    },

    raiseWidget: (state, action: IDInPayload) => {
      const widgetToRaise = state.widgets.find((i) => i.id === action.payload);
      if (widgetToRaise !== undefined) {
        state.widgets = state.widgets.filter((i) => i.id !== action.payload);
        state.widgets = [...state.widgets, widgetToRaise];
      } else {
        console.log("raise: widget not found ");
      }
    },

    openWidget: (state, action: IDInPayload) => {
      const w = state.widgets.find((i) => i.id === action.payload);
      if (w) w.active = true;
      else console.log("open: widget not found");
    },

    toggleWidget: (state, action: IDInPayload) => {
      const w = state.widgets.find((i) => i.id === action.payload);
      if (w) w.active = !w.active;
      else console.log("toggle: widget not found");
    },

    changeWidgetPosition: (state, action: WidgetMutatorInPayload) => {
      const widgetToMutate = state.widgets.find(
        (i) => i.id === action.payload.id
      );
      if (widgetToMutate) {
        widgetToMutate.x = action.payload.x;
        widgetToMutate.y = action.payload.y;
      }
    },

    openWallpaperWindow: (s) => {
      s.wallpaperWindowActive = true;
      s.settingsWindowActive = false;
    },

    closeWallpaperWindow: (s) => {
      s.wallpaperWindowActive = false;
    },

    toggleWallpaperWindow: (s) => {
      s.wallpaperWindowActive = !s.wallpaperWindowActive;
      s.settingsWindowActive = s.wallpaperWindowActive
        ? false
        : s.settingsWindowActive;
    },

    openSettingsWindow: (s) => {
      s.settingsWindowActive = true;
      s.wallpaperWindowActive = false;
    },

    closeSettingsWindow: (s) => {
      s.settingsWindowActive = false;
    },

    toggleSettingsWindow: (s) => {
      s.settingsWindowActive = !s.settingsWindowActive;
      s.wallpaperWindowActive = s.settingsWindowActive
        ? false
        : s.wallpaperWindowActive;
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
} = screenSlice.actions;

export default screenSlice.reducer;
