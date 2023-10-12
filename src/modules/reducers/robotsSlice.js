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
        addBot: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            switch (title) {
                case 'picker': state.pickerBots += value; break;
                case 'planter': state.planterBots += value; break;
                case 'pickler': state.picklerBots += value; break;
                default: return state;
            }
        },
        changeSpeed: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            switch (title) {
                case 'picker': state.pickerSpeed += value; break;
                case 'planter': state.planterSpeed += value; break;
                case 'pickler': state.picklerSpeed += value; break;
                default: return state;
            }
        }
}
});

export const {setAllBots, 
            addBot,
            } = robotsSlice.actions;

export default robotsSlice.reducer;

