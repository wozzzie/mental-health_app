import { createSlice, nanoid } from '@reduxjs/toolkit'

export type WidgetType = "gif" | "music" | "meditation" | "quote" | "news";

export type WidgetAbstraction = {
    id: string;
    type: WidgetType ; // Надо добавить все типы виджетов
    x: number;
    y: number;
    active: boolean
}


type WidgetMutatorInPayload = { 
    payload: {
        x: number,
        y: number
        type: WidgetType
    };
}

interface IDInPayload {
    payload: string
}

interface TypeInPayload {
    payload: WidgetType
}
interface WidgetAbstractionInPayload {
    payload: WidgetAbstraction
}

type InitialStateType = {
    widgets: Array<WidgetAbstraction>
}

const initialState : InitialStateType = {
    widgets: [
        {
            id: "1",
            x: 0,
            y: 0,
            type: "music",
            active: false
        },
        {
            id: "2",
            x: 0,
            y: 0,
            type: "meditation",
            active: false
        },
        {
            id: "3",
            x: 0,
            y: 0,
            type: "gif",
            active: false
        },
        {
            id: "4",
            x: 0,
            y: 0,
            type: "quote",
            active: false
        },
        {
            id: "5",
            x: 0,
            y: 0,
            type: "news",
            active: false
        },
    ]
}


export const counterSlice = createSlice({
  name: 'screen',
  initialState: initialState,
  reducers: {
        closeWidget: (state, action : TypeInPayload) => { // delete by ID
            const w = state.widgets.find(i => i.type === action.payload)
            if (w)
                w.active = false
            else console.log("close: widget not found")
        },

        raiseWidget: (state, action : TypeInPayload) => {
            if (state.widgets.length !== 5)
                throw new Error("raise")
            const widgetToRaise = state.widgets.find(i => i.type === action.payload)
            if (widgetToRaise !== undefined) {
                state.widgets = state.widgets.filter(i=>i.type !== action.payload)
                state.widgets = [...state.widgets, widgetToRaise]
            } 
            else {
                console.log("raise: widget not found ")
            }   
            
        },

        openWidget: (state, action:TypeInPayload) => {
            if (state.widgets.length !== 5)
                throw new Error("open")
            const w = state.widgets.find(i => i.type === action.payload)
            if (w)
                w.active = true
            else console.log("open: widget not found")
            
        },

        toggleWidget: (state, action:TypeInPayload) => {
            const w = state.widgets.find(i => i.type === action.payload)
            if (w)
                w.active = !w.active
            else console.log("toggle: widget not found")
        },

        changeWidgetPosition: (state, action : WidgetMutatorInPayload) => {
            const widgetToMutate = state.widgets.find(i => i.type === action.payload.type);
            if (widgetToMutate) {
                widgetToMutate.x = action.payload.x
                widgetToMutate.y = action.payload.y
            }
        },

  },
})

// Action creators are generated for each case reducer function
export const {  closeWidget, raiseWidget, openWidget, changeWidgetPosition, toggleWidget } = counterSlice.actions

export default counterSlice.reducer