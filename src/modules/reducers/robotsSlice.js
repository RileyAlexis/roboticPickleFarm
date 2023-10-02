import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pickerBots: 0,
    pickerSpeed: 1,
    planterBots: 0,
    planterSpeed: 1,
    picklerBots: 0,
    picklerSpeed: 1
}

export const robotsSlice = createSlice({
    name: 'robots',
    initialState: initialState,
    reducers: {
        setAllBots: (state, action) => {
            return action.payload;
        },
        changePickerBot: (state, action) => {
            return state.pickerBots += action.payload;
        },
        changePlanterBot: (state, action) => {
            return state.planterBots += action.payload;
        },
        changePicklerBot: (state, action) => {
            return state.picklerBots += action.payload;
        },
        changePickerSpeed: (state, action) => {
            return state.pickerSpeed += action.payload;
        },
        changePlanterSpeed: (state, action) => {
            return state.planterSpeed += action.payload;
        },
        changePicklerSpeed: (state, action) => {
            return state.picklerSpeed += action.payload;
        }
    }
});

export const {setAllBots, 
            changePickerBot, 
            changePickerSpeed, 
            changePlanterBot, 
            changePlanterSpeed, 
            changePicklerBot, 
            changePicklerSpeed
            } = robotsSlice.actions;

export default robotsSlice.reducer;

