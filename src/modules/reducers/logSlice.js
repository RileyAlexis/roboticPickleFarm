import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
    name: 'log',
    initialState: [],
    reducers: {
        setAllLog: (state, action) => {
            return action.payload;
        },
        addLog: (state, action) => {
            state.push(action.payload);
            if (state.log.length > 20) {
                state.log = state.log.slice(-20);
            }
            return state;
        },
    }
})

export const {
            setAllLog,
            addLog,
            } = logSlice.actions;

export default logSlice.reducer;