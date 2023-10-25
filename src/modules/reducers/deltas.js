import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    buttonDelta: 0,
    eventDelta: 0,
    autoSaveDelta: 0,
    deadplantsDelta: 0,
}

export const deltaSlice = createSlice({
    name: 'deltas',
    initialState: initialState,
    reducers: {
        cycleDeltas : (state, action) => {
            state.buttonDelta += 1;
            state.eventDelta += 1;
            state.autoSaveDelta += 1;
            state.deadplantsDelta += 1;
            },
        resetDelta : (state, action) => {
            switch(action.payload) {
                case 'resetButtonDelta': state.buttonDelta = 0; break;
                case 'resetEventDelta': state.eventDelta = 0; break;
                case 'resetAutoSaveDelta': state.autoSaveDelta = 0; break;
                case 'resetDeadplantsDelta': state.deadplantsDelta = 0; break;
            }
        }
}})

export const { cycleDeltas, resetDelta } = deltaSlice.actions;
export default deltaSlice.reducer;
