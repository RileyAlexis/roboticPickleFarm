import { createSlice } from "@reduxjs/toolkit";

const initialState = 
    [
        {name: 'Plant', coolDown: 4000, show: true, data: "" },
        {name: 'Pick', coolDown: 2000, show: false, data: "" },
        {name: 'Pickle', coolDown: 5000, show: false, data: "" },
        {name: 'Buy Seed', coolDown:2000, show: false, data: "" }
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
            },
            changeName: (state, action) => {
                const title = action.payload.title;
                const value = action.payload.value;
                state[title] = value;                
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

    export const { toggleItem, changeName, showItem } = farmMenuSlice.actions;

    export default farmMenuSlice.reducer;