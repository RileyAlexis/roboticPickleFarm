import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plantCount: {value: 0, exponent: ''},
    growthRate: 0.08,
    currentYield: {value: 0, exponent: ''},
    growthRateModifier: 1,
    seedChance: 0.00001,
    maxYield: 5,
}

const plantSlice = createSlice({
    name: 'plants',
    initialState: initialState,
    reducers: {
        setAllPlants: (state, action) => {
            return action.payload;
        },
        addNewPlant: (state, action) => {
            state.plantCount.value += action.payload;
        },
        changeAllGrowthRate: (state, action) => {
            const percentage = action.payload;
            return state.map((plant) => ({
                ...plant, growthRate: plant.growthRate + (plant.growthRate * percentage) / 100,
            }))
        },
        changeAllSeedChance: (state, action) => {
            const percentage = action.payload;
            return state.map((plant) => ({
                ...plant, seedChance: plant.seedChance + (plant.seedChance * percentage) / 100,
            }))
        },
        addPercentageTo: (state, action) => {
            const percentage = action.payload.value / 100;
            const title = action.payload.title;
            state[title] += (state[title] * percentage);
        }
        
    }
})

export const { setAllPlants, addPercentageTo } = plantSlice.actions;

export default plantSlice.reducer;

