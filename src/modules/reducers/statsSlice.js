import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    maxYield: 0,
    ripeCucumbers: 0,
    totalGrowthRate: 0,
    averageAge: 0,
    cycles: 0,
    planterActive: false,
    pickerActive: false,
    picklerActive: false,
    planterDelta: 0,
    pickerDelta: 0,
    picklerDelta: 0,
    totalProduction: 0,
    timeframe: 60,
    gameSpeed: 1000,
    recurringCosts: [],
    
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
            let newState = state;
            state[title] = value;
        },
        setStats: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            switch (title) {
                case 'maxYield': state.maxYield = parseFloat(value.toFixed(2)); break;
                case 'ripeCucumbers': state.ripeCucumbers = parseFloat(value.toFixed(2)); break;
                case 'totalGrowthRate': state.totalGrowthRate = parseFloat(value.toFixed(2)); break;
                case 'averageAge': state.averageAge = parseFloat(value.toFixed(2)); break;
                case 'timeFrame': state.timeFrame = value; break;
                case 'totalProduction': state.totalProduction += value; break;
            }
        },
        toggleActive: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            switch (title) {
                case 'planter': state.planterActive = !state.planterActive; state.planterDelta = value; break;
                case 'picker': state.pickerActive = !state.pickerActive; state.pickerDelta = value; break;
                case 'pickler': state.picklerActive = !state.picklerActive; state.picklerDelta = value; break;
            }
        },
        runCycle: (state, action) => {
            state.cycles += 1;
        }
    }
})

export const { setAllStats, changeStat, setStats, toggleActive, runCycle} = statsSlice.actions;
export default statsSlice.reducer;