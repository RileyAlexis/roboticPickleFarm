import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {name: 'Rugged Wheels', 
        show: true, 
        price: 500, 
        disabled: false, 
        showAt: 500,
        dispatch: { type: 'robots/changeSpeed', payload: {title: 'picker', value: 1 }},
        data: 'Refit all Picker Bots with ruggedized wheels - speed +1 / Cost: 500',
        log: 'All Picker Bots refitted with ruggedized wheels'
    },
    {name: 'Grabber Claw', 
        show: true, 
        price: 500, 
        disabled: false, 
        showAt: 500,
        dispatch: { type: 'robots/changeSpeed', payload: {title: 'pickler', value: 1 }},
        data: 'Refit all Pickling Bots with a grabber claw - speed +1 / Cost: 500',
        log: 'All Pickling Bots refitted with grabber claws'
    },
    {name: 'Shovel Arm', 
        show: true, 
        price: 500, 
        disabled: false, 
        showAt: 500,
        dispatch: { type: 'robots/changeSpeed', payload: {title: 'planter', value: 1 }},
        data: 'Refit all Planter Bots with a shovel arm - speed +1 / Cost: 500',
        log: 'All Planter Bots refitted with shovel arms'
    },
    {name: 'Germination',
        show: false,
        price: 1500,
        disabled: false,
        showAt: 1500,
        dispatch: { type: 'plantsSettings/changePlantSettings', payload: {title: 'seedChance', value: 0.0001}},
        data: 'Increase the chance new plants generate a seed by 0.0001% / Cost 1500',
        log: 'Seed Chances increased by 0.0001%'
    },
    {name: 'Pickle Juice',
        show: false,
        price: 2500,
        disabled: false,
        showAt: 2500,
        dispatch: { type: 'plants/changeAllGrowthRate', payload: 10 },
        data: 'Bio-hack those vines with sweet vinegary pickle juice. Increase growth rate of all plants by 10% / Cost 2500',
        log: 'Pickle juice hack unlocked!'
},    
    {name: 'Super Duper Upgrade',
        show: false,
        price: 50000,
        disabled: false,
        showAt: 50000,
        dispatch: { type: 'resources/changeResources', payload: {title: 'seeds', value: 10000 }},
        data: 'Get lots of seeds / Cost 50000',
        log: 'I bought a bunch of seeds'
},

];

const updgradesSlice = createSlice({
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