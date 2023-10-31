import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {name: 'Buy Planter Bot', 
        coolDown: 4000, 
        show: true, 
        data: "Buy 1 Planter Bot for 100 pickles" },
    {name: 'Buy Picker Bot', 
        coolDown: 2000, 
        show: true, 
        data: "Buy 1 Picker Bot for 100 pickles" },
    {name: 'Buy Pickler Bot', 
        coolDown:2000, 
        show: true, 
        data: "Buy 1 Pickler Bot for 100 pickles" },
    {name: 'Buy 10 Planter Bots', 
        coolDown: 4000,
        show: false,
        showAt: 50000,
        data: "Buy 10 Pickler Bots for 1,000 pickles"},
    {name: 'Buy 10 Picker Bots', 
        coolDown: 4000,
        show: false,
        showAt: 50000,
        data: "Buy 10 Picker Bots for 1,000 pickles"},
    {name: 'Buy 10 Pickler Bots', 
        coolDown: 4000,
        show: false,
        showAt: 50000,
        data: "Buy 10 Pickler Bots for 1,000 pickles"},
    {name: 'Buy 100 Planter Bots', 
        coolDown: 4000,
        show: false,
        showAt: 500000,
        data: "Buy 100 Pickler Bots for 10,000 pickles"},
    {name: 'Buy 100 Picker Bots', 
        coolDown: 4000,
        show: false,
        showAt: 500000,
        data: "Buy 100 Picker Bots for 10,000 pickles"},
    {name: 'Buy 100 Pickler Bots', 
        coolDown: 4000,
        show: false,
        showAt: 500000,
        data: "Buy 100 Pickler Bots for 10,000 pickles"},
    {name: 'Buy 1000 Planter Bots', 
        coolDown: 4000,
        show: false,
        showAt: 5000000,
        data: "Buy 1000 Pickler Bots for 100,000 pickles"},
    {name: 'Buy 1000 Picker Bots', 
        coolDown: 4000,
        show: false,
        showAt: 5000000,
        data: "Buy 1000 Picker Bots for 100,000 pickles"},
    {name: 'Buy 100 Pickler Bots', 
        coolDown: 4000,
        show: false,
        showAt: 5000000,
        data: "Buy 100 Pickler Bots for 100,000 pickles"},
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
            },
        resetMenu: (state, action) => {
                return initialState;
            }
    }
})

export const { toggleItem, showItem } = robotsMenuSlice.actions;

export default robotsMenuSlice.reducer;