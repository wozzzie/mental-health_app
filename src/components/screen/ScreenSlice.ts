import { createSlice, nanoid } from "@reduxjs/toolkit";

export type WidgetType =
  | "gif"
  | "music"
  | "meditation"
  | "quote"
  | "news"
  | "tarot";

export type WidgetAbstraction = {
  id: string;
  x: number;
  y: number;
  type: WidgetType;
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

interface TypeInPayload {
  payload: WidgetType;
}
interface WidgetAbstractionInPayload {
  payload: WidgetAbstraction;
}

type InitialStateType = {
  widgets: Array<WidgetAbstraction>;
  wallpaperWindowActive: boolean;
};

const initialState: InitialStateType = {
  widgets: [
    {
      id: "1",
      x: 0,
      y: 0,
      type: "music",
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
      type: "meditation",
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
      type: "gif",
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
      type: "quote",
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
      type: "news",
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
      type: "tarot",
      active: false,
      icon: {
        src: "/tarot.svg",
        alt: "Tarot",
      },
    },
  ],

  wallpaperWindowActive: false,
};

type WidgetMutatorInPayload = {
  payload: {
    x: number;
    y: number;
    type: WidgetType;
  };
};

export const screenSlice = createSlice({
  name: "screen",
  initialState: initialState,
  reducers: {
    closeWidget: (state, action: TypeInPayload) => {
      // delete by ID
      const w = state.widgets.find((i) => i.type === action.payload);
      if (w) w.active = false;
      else console.log("close: widget not found");
    },

    raiseWidget: (state, action: TypeInPayload) => {
      const widgetToRaise = state.widgets.find(
        (i) => i.type === action.payload
      );
      if (widgetToRaise !== undefined) {
        state.widgets = state.widgets.filter((i) => i.type !== action.payload);
        state.widgets = [...state.widgets, widgetToRaise];
      } else {
        console.log("raise: widget not found ");
      }
    },

    openWidget: (state, action: TypeInPayload) => {
      const w = state.widgets.find((i) => i.type === action.payload);
      if (w) w.active = true;
      else console.log("open: widget not found");
    },

    toggleWidget: (state, action: TypeInPayload) => {
      const w = state.widgets.find((i) => i.type === action.payload);
      if (w) w.active = !w.active;
      else console.log("toggle: widget not found");
    },

    changeWidgetPosition: (state, action: WidgetMutatorInPayload) => {
      const widgetToMutate = state.widgets.find(
        (i) => i.type === action.payload.type
      );
      if (widgetToMutate) {
        widgetToMutate.x = action.payload.x;
        widgetToMutate.y = action.payload.y;
      }
    },

    openWallpaperWindow: (s) => {
      s.wallpaperWindowActive = true;
    },

    closeWallpaperWindow: (s) => {
      s.wallpaperWindowActive = false;
    },

    toggleWallpaperWindow: (s) => {
      s.wallpaperWindowActive = !s.wallpaperWindowActive;
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
} = screenSlice.actions;

export default screenSlice.reducer;
