import { createSlice } from "@reduxjs/toolkit";
import { convertToMillion } from "../engine";

const initialState = {
    maxYield: {value: 0, exponent: ''},
    ripeCucumbers: {value: 0, exponent: ''},
    totalGrowthRate: {value: 0, exponent: ''},
    growthModifer: 0,
    totalMaxedOut: 0,
    averageAge: 0,
    cycles: 0,
    planterActive: false,
    pickerActive: false,
    picklerActive: false,
    planterDelta: 0,
    pickerDelta: 0,
    picklerDelta: 0,
    totalProduction: {value: 0, exponent: ''},
    million: Math.pow(10, 6),
    billion: Math.pow(10, 9),
    trillion: Math.pow(10, 12),
    exponent: '',
    totalGoal: 2.8,
    timeframe: 60,
    gameSpeed: 1000,
    autoSaveInterval: 120,
    recurringCosts: [],
    playGuide: false,
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState: initialState,
    reducers: {
        setAllStats: (state, action) => {
            return action.payload;
        },
        changeStat: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            if (typeof state[title] === 'object') { state[title].value += value 
            } else {
            state[title] += value;
            }
        },
        setStat: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            console.log(typeof state[title]);
            if (typeof state[title] === 'object') { state[title].value = value 
            } else {
            state[title] = value;
            }
        },
        toggleActive: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            switch (title) {
                case 'planter': state.planterActive = !state.planterActive; state.planterDelta = value; break;
                case 'picker': state.pickerActive = !state.pickerActive; state.pickerDelta = value; break;
                case 'pickler': state.picklerActive = !state.picklerActive; state.picklerDelta = value; break;
                case 'playGuide': state.playGuide = !state.playGuide; break;
            }
        },
        runCycle: (state, action) => {
            state.cycles += 1;
        }
    }
})

export const { setAllStats, changeStat, setStat, toggleActive, runCycle} = statsSlice.actions;
export default statsSlice.reducer;