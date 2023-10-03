import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seeds: 25,
    cucumbers: 0,
    pickles: 0,
    pickleJars: 0,
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
            switch (title) {
                case 'seeds': state.seeds += value; break;
                case 'cucumbers': state.cucumbers += value; break;
                case 'pickles': state.pickles += value; break;
                case 'pickleJars': state.pickleJars += value; break;
            default: return state;
            }
        },
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
