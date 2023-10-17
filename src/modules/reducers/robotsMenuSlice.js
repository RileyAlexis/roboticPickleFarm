import { createSlice } from "@reduxjs/toolkit";

const initialState = [
{name: 'Buy Planter Bot', coolDown: 4000, show: true, data: "" },
{name: 'Buy Picker Bot', coolDown: 2000, show: true, data: "" },
{name: 'Buy Pickler Bot', coolDown:2000, show: true, data: "" },
];

export const robotsMenuSlice = createSlice({
    name: 'robotsMenu',
    initialState: initialState,
    reducers: {
        toggleItem: (state, action) => {
            for (let i in state) {
                if (state[i].name === action.payload) {
                    state[i].show = !state[i].show;
                }
                return [...state];
            }
        },
        showItem: (state, action) => {
            const title = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === title) {
                    state[i].show = true;
                    }
                }
            }
    }
})

export const { toggleItem, showItem } = robotsMenuSlice.actions;

export default robotsMenuSlice.reducer;