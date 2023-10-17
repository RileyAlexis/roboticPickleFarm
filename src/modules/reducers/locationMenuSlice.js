import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: 'farm', title: 'Farm', show: true },
    {id: 'robots', title: 'Robots', show: false },
    {id: 'buildings', title: 'Buildings', show: false },
    {id: 'upgrades', title: 'Upgrades', show:false },
    {id: 'cheatOptopns', title: 'Cheats', show: true }
];

    export const locationMenuSlice = createSlice({
        name: 'locationMenu',
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
                    if (state[i].title === title) {
                        state[i].show = true;
                        }
                    }
                }
        }
    })

    export const { toggleItem, showItem } = locationMenuSlice.actions;

    export default locationMenuSlice.reducer;