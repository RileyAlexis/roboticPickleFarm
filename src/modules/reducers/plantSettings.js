import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modifier: 1,
    growthRate: 0.08,
    growthModifer: 0,
    maxYield: 5,
    deathChance: 0.01,
    aging: 0.001,
    maxAge: 270,
    seedChance: 0.0001
}

export const plantSettingsSlice = createSlice({
    name: 'plantSettings',
    initialState: initialState,
    reducers: {
        setAllPlantSettings: (state, action) => {
            return action.payload;
        },
        changePlantSettings: (state, action) => {
            const value = action.payload.value;
            const title = action.payload.title;
            switch (title) {
                case 'modifier': state.modifier += value; break;
                case 'growthRate': state.growthRate += value;break;
                case 'growthModifier': state.growthModifer += value;break;
                case 'maxYield': state.maxYield += value;break;
                case 'deathChance': state.deathChance += value;break;
                case 'aging': state.aging += value;break;
                case 'maxAge': state.maxAge += value;break;
                case 'seedChance': state.seedChance += value; break;
            }
        }
    }
})

export const { setAllPlantSettings, changePlantSettings} = plantSettingsSlice.actions;
export default plantSettingsSlice.reducer;