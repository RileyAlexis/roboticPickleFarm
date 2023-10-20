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
            state.plants.forEach(plant => {
                plant.seedChance +=  action.payload;
            })
        }
    }
})

export const {
            setAllPlants,
            addNewPlant,
            changeAllGrowthRate
            } = plantSlice.actions;

export default plantSlice.reducer;

