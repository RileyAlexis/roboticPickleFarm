import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seeds: [5],
    seedsExponent: '',
    cucumbers: [0],
    cucumbersExponent: '',
    pickles: [0],
    picklesExponent: '',
    pickleJars: [0],
    pickleJarsExponent: ''
}

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState: initialState,
    reducers: {
        setAllResources: (state, action) => {
            return action.payload;
        },
        changeResources: (state, action) => {
            const value = action.payload.value;
            
            const title = action.payload.title;
            const currentArr = state[title].slice(-1000);
            
            if (currentArr.length > 0) { 
                const lastEntry = currentArr[currentArr.length-1];
            
            const updatedArr = [...currentArr, lastEntry + value];
            return { ...state, [title]: updatedArr }
        }},
        setResources: (state, action) => {
            const value = action.payload.value;
            const title = action.payload.title;
            switch (title) {
                case 'seeds': state.seeds = value; break;
                case 'cucumbers': state.cucumbers = value; break;
                case 'pickles': state.pickles = value; break;
                case 'pickleJars': state.pickleJars = value; break;
            }
        }
    }
})

export const {setAllResources, changeResources, setResources} = resourcesSlice.actions;

export default resourcesSlice.reducer;
