import { createSlice } from "@reduxjs/toolkit";

const plantSlice = createSlice({
    name: 'plants',
    initialState: [],
    reducers: {
        setAllPlants: (state, action) => {
            return action.payload;
        },
        addNewPlant: (state, action) => {
            return [...state, action.payload]
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
        changeAllMaxYield: (state, action) => {
            const percentage = action.payload;
            return state.map((plant) => ({
                ...plant, maxYield: plant.maxYield + (plant.maxYield * percentage) / 100,
            })) 
        },
        changeAllMaxAge: (state, action) => {
            const percentage = action.payload;
            return state.map((plant) => ({
                ...plant, maxAge: plant.maxAge + (plant.maxAge * percentage) / 100,
            })) 
        },
        
    }
})

export const {
            setAllPlants,
            addNewPlant,
            changeAllGrowthRate
            } = plantSlice.actions;

export default plantSlice.reducer;

