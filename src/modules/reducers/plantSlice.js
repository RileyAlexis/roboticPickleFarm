import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plants: [],
}

const plantSlice = createSlice({
    name: 'plants',
    initialState: initialState,
    reducers: {
        setAllPlants: (state, action) => {
            return action.payload;
        },
        addNewPlant: (state, action) => {
            return [...state, action.payload]
        },
        changeAllGrowthRate: (state, action) => {
            state.plants.forEach(plant => {
                plant.growthRate += action.payload;
            });
        },
    }
})

export const {
            setAllPlants,
            addNewPlant,
            changeAllGrowthRate
            } = plantSlice.actions;

export default plantSlice.reducer;

