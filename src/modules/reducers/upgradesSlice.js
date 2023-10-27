import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {name: 'Rugged Wheels', 
        show: true, 
        price: 500, 
        disabled: false, 
        showAt: 500,
        dispatch: [{ type: 'robots/changeSpeed', payload: {title: 'picker', value: 1 }}],
        data: 'Refit all Picker Bots with ruggedized wheels - speed +1 / Cost: 500',
        log: 'All Picker Bots refitted with ruggedized wheels'
    },
    {name: 'Grabber Claw', 
        show: true, 
        price: 500, 
        disabled: false, 
        showAt: 500,
        dispatch: [{ type: 'robots/changeSpeed', payload: {title: 'pickler', value: 1 }}],
        data: 'Refit all Pickling Bots with a grabber claw - speed +1 / Cost: 500',
        log: 'All Pickling Bots refitted with grabber claws'
    },
    {name: 'Shovel Arm', 
        show: true, 
        price: 500, 
        disabled: false, 
        showAt: 500,
        dispatch: [{ type: 'robots/changeSpeed', payload: {title: 'planter', value: 1 }}],
        data: 'Refit all Planter Bots with a shovel arm - speed +1 / Cost: 500',
        log: 'All Planter Bots refitted with shovel arms'
    },
    {name: 'Germination',
        show: false,
        price: 1500,
        disabled: false,
        showAt: 1500,
        dispatch: [
            { type: 'plants/addPercentageTo', payload: { title: 'seedChance', value: 5 }}
        ],
        data: 'Increase the chance plants generate a seed by 5% / Cost 1500',
        log: 'Seed Chances increased by 5%'
    },
    {name: 'Pickle Juice',
        show: false,
        price: 2500,
        disabled: false,
        showAt: 2500,
        dispatch: [
            { type: 'plants/addPercentageTo', payload: { title: 'growthRate', value: 10 }}
            ],
        data: 'Bio-hack those vines with sweet vinegary pickle juice. Increase growth rate of all plants by 10% / Cost 2500',
        log: 'Pickle juice hack unlocked!'
},    
    {name: 'Bigger Batteries',
        show: false,
        price: 5000,
        disabled: false,
        showAt: 5000,
        dispatch: [
            { type: 'robots/changeSpeed', payload: {title: 'planter', value: 1 }},
            { type: 'robots/changeSpeed', payload: {title: 'picker', value: 1 }},
            { type: 'robots/changeSpeed', payload: {title: 'pickler', value: 1 }},
            ],
        data: 'Refit all bots with bigger batteries - speed +1 / Cost 5000',
        log: 'Bigger batteries make all bots go zoomier!'
},
    {name: 'C18H24O2',
        show: false,
        price: 15000,
        disabled: false,
        showAt: 15000,
        dispatch: [
            { type: 'plants/addPercentageTo', payload: { title: 'growthRate', value: 20 }}
            ],
        data: 'Super charge your plants - Growth Rate +20% / Cost 15,000',
        log: 'Plants fertilized!'
        },
    {name: 'Skittles for Robots',
        show: false,
        price: 25000,
        disabled: false,
        showAt: 25000,
        dispatch: [
            { type: 'robots/changeSpeed', payload: {title: 'planter', value: 1 }},
            { type: 'robots/changeSpeed', payload: {title: 'picker', value: 1 }},
            { type: 'robots/changeSpeed', payload: {title: 'pickler', value: 1 }},
            ],
        data: 'Robots love skittles - speed +1 / Cost 25,000',
        log: 'Robot sugar rush!'
        },
    {name: 'Bot Goes Spinny!',
        show: false,
        price: 100000,
        disabled: false,
        showAt: 100000,
        dispatch: [
            { type: 'robots/changeSpeed', payload: {title: 'planter', value: 1 }},
            { type: 'robots/changeSpeed', payload: {title: 'picker', value: 1 }},
            { type: 'robots/changeSpeed', payload: {title: 'pickler', value: 1 }},
            ],
        data: 'Robots all go spinny! - speed +1 / Cost 100,000',
        log: 'Robot goes spinny'
        },
    {name: 'Heat From Fire',
        show: false,
        price: 200000,
        disabled: false,
        showAt: 200000,
        dispatch: [
            { type: 'plants/addPercentageTo', payload: { title: 'maxYield', value: 20 }}
            ],
        data: 'Increase the Max Yield of each plant - max Yield + 20% / Cost 200,000',
        log: 'Vines are getting heavy!'
        },
    {name: 'Fire From Heat',
        show: false,
        price: 500000,
        disabled: false,
        showAt: 500000,
        dispatch: [
            { type: 'plants/addPercentageTo', payload: { title: 'maxYield', value: 30 }}
            ],
        data: 'Increase the Max Yield of each plant - max Yield + 30% / Cost 500,000',
        log: 'Vines are getting heavy!'
        },
    {name: 'Gene Splicing',
        show: false,
        price: 700000,
        disabled: false,
        showAt: 700000,
        dispatch: [
            { type: 'plants/addPercentageTo', payload: { title: 'seedChance', value: 10 }}
            ],
        data: 'Increase chance plants generate a new seed - seed chance + 10% / Cost 700,000',
        log: 'Seed chance increased by 10%'
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