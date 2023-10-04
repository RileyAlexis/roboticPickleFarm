import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
    name: 'log',
    initialState: [{
        line: '', cycle: 0
    }],
    reducers: {
        setAllLog: (state, action) => {
            return action.payload;
        },
        addLog: (state, action) => {
            return [...state, action.payload];
        },
    }
})

export const {
            setAllLog,
            addLog,
            } = logSlice.actions;

export default logSlice.reducer;