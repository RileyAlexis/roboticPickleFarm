import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: "Farmer's Roadside Kiosk",
        id: 1,
        show: true,
        purchased: false,
        showAt: 5000,
        price: 5000,
        recurringCost: 5,
        options: [1, 5, 10],
        selectedOption: 1,
        expanded: false,
        disabled: false,
        active: false,
        data: "Build a kiosk to automatically purchase seeds when you run out / Cost 5000 +5 every round.",
        line: "Auto purchase seeds every turn - ",
        label: "Seeds:"
    },
    {
        name: "Cathouse",
        id: 2,
        show: false,
        purchased: false,
        showAt: 10000,
        price: 10000,
        recurringCost: 10,
        options: [1,5,10,20,30,40,50],
        selectedOption: 1,
        expanded: false,
        disabled: false,
        active: false,
        data: "This thing costs 10,000 pickles and doesn't do anything yet",
        line: "Spend pickles, have fun!",
        label: "How Many?"
    },
]

const buildingsSlice = createSlice({
    name: 'buildings',
    initialState: initialState,
    reducers: {
        setAllBuildings: (state, action) => {
            return action.payload;
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
            },
        toggleActiveItem: (state, action) => {
            const title = action.payload.title;
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === title) {
                    state[i].active = !state[i].active;
                }
            }
            },
        toggleExpander: (state, action) => {
            const title = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === title) {
                    state[i].expanded = !state[i].expanded;
                }
            }
            },
        buyBuilding: (state, action) => {
            const title = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === title) {
                    state[i].purchased = true;
                }
            }
            }, 
        changeOption: (state, action) => {
            const title = action.payload.title;
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === title) {
                    state[i].selectedOption = action.payload.value;
                }
            }
        }
        
    }

});

export const { setAllBuildings, showItem, disableItem, toggleActiveItem, toggleExpander, buyBuilding, changeOption } = buildingsSlice.actions;
export default buildingsSlice.reducer;