import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {name: 'Rugged Wheels', 
        show: true, 
        price: 500, 
        disabled: false, 
        dispatch: { type: 'robots/changeSpeed', payload: {title: 'picker', value: 1 }},
        data: 'Refit all Picker Bots with ruggedized wheels - speed +1 / Cost: 500'},
    {name: 'Grabber Claw', 
        show: true, 
        price: 500, 
        disabled: false, 
        dispatch: { type: 'robots/changeSpeed', payload: {title: 'pickler', value: 1 }},
        data: 'Refit all Pickling Bots with a grabber claw - speed +1 / Cost: 500'},
    {name: 'Shovel Arm', 
        show: true, 
        price: 500, 
        disabled: false, 
        dispatch: { type: 'robots/changeSpeed', payload: {title: 'planter', value: 1 }},
        data: 'Refit all Planter Bots with a shovel arm - speed +1 / Cost: 500'},
];

export const updgradesSlice = createSlice({
    name: 'upgrades',
    initialState: initialState,
    reducers: {
        setAllUpgrades: (state, action) => {
            return action.payload;
        },
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
        disableItem: (state, action) => {
            const title = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === title) {
                    state[i].disabled = true;
                    }
                }
        }
    }
})

export const { setAllUpgrades, toggleItem, showItem, disableItem } = updgradesSlice.actions;
export default updgradesSlice.reducer;