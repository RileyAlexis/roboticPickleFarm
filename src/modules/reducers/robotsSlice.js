import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pickerBots: {value: 0, exponent: ''},
    pickerSpeed: 1,
    planterBots: {value: 0, exponent: ''},
    planterSpeed: 1,
    picklerBots: {value: 0, exponent: ''},
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
            console.log('Addbot', title, value)
            switch (title) {
                case 'picker': state.pickerBots.value += value; break;
                case 'planter': state.planterBots.value += value; break;
                case 'pickler': state.picklerBots.value += value; break;
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
        },
        changeSpeedPercentage: (state, action) => {
            const percentage = action.payload.value / 100;
            const title = action.payload.title;
            state[title] += (state[title] * percentage);
        }
}
});

export const {setAllBots, 
            addBot,
            } = robotsSlice.actions;

export default robotsSlice.reducer;

