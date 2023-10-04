import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seeds: [50, 5],
    bots: [100, 1]
}

export const pricesSlice = createSlice({
    name: 'prices',
    initialState: initialState,
    reducers: {
        updatePrice: (state, action) => {
            return [...state, action.payload];
        }
    }
})

export const { updatePrice } = pricesSlice.actions;

export default pricesSlice.reducer;