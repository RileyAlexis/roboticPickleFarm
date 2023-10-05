import { createSlice } from "@reduxjs/toolkit";

const initialState = 
    [
        {name: 'Plant', coolDown: 4000, show: true },
        {name: 'Pick', coolDown: 2000, show: true },
        {name: 'Pickle', coolDown: 5000, show: true },
        {name: 'Buy Seed', coolDown:2000, show: true }
    ];

    export const farmMenuSlice = createSlice({
        name: 'farmMenu',
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

    export const { toggleItem } = farmMenuSlice.actions;

    export default farmMenuSlice.reducer;