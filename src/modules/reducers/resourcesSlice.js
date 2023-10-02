import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seeds: 5,
    cucumbers: 0,
    pickles: 0,
    pickleJars: 0
}

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState: initialState,
    reducers: {
        setAllResources: (state, action) => {
            return action.payload;
        },
        changeSeeds: (state, action) => {
            return state.seeds += action.payload;
        },
        changeCucumbers: (state, action) => {
            return state.cucumbers += action.payload;
        },
        changePickles: (state, action) => {
            return state.pickles += action.payload;
        },
        changePickleJars: (state, action) => {
            return state.pickleJars += action.payload;
        }
       
    }
})

export const {setAllResources, 
            changeSeeds, 
            changeCucumbers, 
            changePickles, 
            changePickleJars
            } = resourcesSlice.actions;

export default resourcesSlice.reducer;
