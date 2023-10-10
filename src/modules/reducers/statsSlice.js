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
    pickleProduction: [],
    cucumberProduction: [],
    seedProduction:[],
    timeframe: 60,
    gameSpeed: 1000,
    
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState: initialState,
    reducers: {
        setAllStats: (state, action) => {
            return action.payload;
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
        trackStats: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            switch (title) {
                case 'cucumbers': state.cucumberProduction = [...state.cucumberProduction, value]; break;
                case 'pickles': state.pickleProduction = [...state.pickleProduction, value]; break;
                case 'seeds': state.seedProduction = [...state.seedProduction, value]; break;
            }
        },
        runCycle: (state, action) => {
            state.cycles += 1;
        }
    }
})

export const { setAllStats, setStats, toggleActive, runCycle} = statsSlice.actions;
export default statsSlice.reducer;