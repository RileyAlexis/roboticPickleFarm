import { createSlice } from "@reduxjs/toolkit";

const initialState = [
{name: 'Buy Planter Bot', coolDown: 4000, show: true },
{name: 'Buy Picker Bot', coolDown: 2000, show: true},
{name: 'Buy Pickler Bot', coolDown:2000, show: true},
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
        }
    }
})

export const { toggleItem } = robotsMenuSlice.actions;

export default robotsMenuSlice.reducer;