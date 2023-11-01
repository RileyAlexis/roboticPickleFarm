import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: "Farmer's Roadside Kiosk",
        id: 1,
        show: true,
        purchased: false,
        showAt: 50000,
        price: 50000,
        recurringCost: 5,
        activeCost: 0,
        options: [1, 5, 10, 20, 50, 100, 500, 1000],
        operations: 0,
        selectedOption: 1,
        expanded: false,
        disabled: false,
        active: false,
        data: "Build a kiosk to automatically purchase seeds when you run out / Cost 50,000 +5 pickles every round when active.",
        line: "Auto purchase seeds every turn: ",
        label: "Seeds:"
    },
    {
        name: "Picker Bot House",
        id: 2,
        show: false,
        purchased: false,
        showAt: 3000000,
        price: 3000000,
        recurringCost: 50,
        activeCost: 0,
        options: [1, 5, 10, 20, 50, 100],
        selectedOption: 1,
        expanded: false,
        disabled: false,
        active: false,
        data: "Buy Picker Bots to keep up with the growth rate! / Cost 3,000,000 +50 every round",
        line: "How many picker bots to buy each turn: ",
        label: "Bots"
    },
    {
        name: "Pickler Bot Station",
        id: 3,
        show: false,
        purchased: false,
        showAt: 3500000,
        price: 3500000,
        recurringCost: 50,
        activeCost: 0,
        options: [1, 5, 10, 20, 50, 100],
        selectedOption: 1,
        expanded: false,
        disabled: false,
        active: false,
        data: "Buy Pickler Bots to keep up with demand! / Cost 3,500,000 +50 every round",
        line: "How many pickler bots to buy each turn: ",
        label: "Bots"
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
            },    
        pushOption: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === title) {
                    state[i].options.push(value);
                }
            }
        },
        setActiveCost: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === title) {
                    state[i].activeCost = value;
                }
            }
            },
        cycleBulding: (state, action) => {
            const title = action.payload;
            for (let i = 0; i < state.length; i++) {
                if (state[i].name === title) {
                    state[i].operations += 1;
                }
            }
            },
        resetBuildings: (state, action) => {
            return initialState;
        }

    }})

export const { setAllBuildings, showItem, disableItem, toggleActiveItem, toggleExpander, buyBuilding, changeOption, cycleBulding, setActiveCost } = buildingsSlice.actions;
export default buildingsSlice.reducer;