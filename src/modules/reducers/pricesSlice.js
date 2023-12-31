import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seeds: [50, 1],
    bots: [100, 1]
}

export const pricesSlice = createSlice({
    name: 'prices',
    initialState: initialState,
    reducers: {
        //This may be broken do not use it
        updatePrice: (state, action) => {
            return [...state, action.payload];
        }
    }
})

export const { updatePrice } = pricesSlice.actions;

export default pricesSlice.reducer;