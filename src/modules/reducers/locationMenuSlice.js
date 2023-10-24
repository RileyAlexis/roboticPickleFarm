import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: 'farm', 
        name: 'Farm', 
        show: true,
        showAt: 0 },
    {id: 'robots', 
        name: 'Robots', 
        show: false,
        showAt: 100 },
    {id: 'buildings', 
        name: 'Buildings', 
        show: false,
        showAt: 5000 },
    {id: 'upgrades', 
        name: 'Upgrades', 
        show:false,
        showAt: 500 },
    {id: 'cheatOptopns', 
        name: 'Cheats', 
        show: true }
];

const locationMenuSlice = createSlice({
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
                    if (state[i].id === title) {
                        state[i].show = true;
                        }
                    }
                }
        }
    })

    export const { toggleItem, showItem } = locationMenuSlice.actions;

    export default locationMenuSlice.reducer;