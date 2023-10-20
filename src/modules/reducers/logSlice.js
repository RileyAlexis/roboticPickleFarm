import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
    name: 'log',
    initialState: [],
    reducers: {
        setAllLog: (state, action) => {
            return action.payload;
        },
        addLog: (state, action) => {
            return [action.payload, ...state];
        },
    }
})

export const {
            setAllLog,
            addLog,
            } = logSlice.actions;

export default logSlice.reducer;