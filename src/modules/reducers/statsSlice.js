import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    maxYield: 0,
    ripeCucumbers: 0,
    totalGrowthRate: 0,
    averageAge: 0,
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState: initialState,
    reducers: {
        setAllStats: (state, action) => {
            return action.payload;
        },
        setStats: (state, action) => {
            const title = action.payload.title;
            const value = action.payload.value;
            switch (action.payload.title) {
                case 'maxYield': state.maxYield = parseFloat(value.toFixed(2)); break;
                case 'ripeCucumbers': state.ripeCucumbers = parseFloat(value.toFixed(2)); break;
                case 'totalGrowthRate': state.totalGrowthRate = parseFloat(value.toFixed(2)); break;
                case 'averageAge': state.averageAge = parseFloat(value.toFixed(2)); break;
            }
        }
    }
})

export const { setAllStats, setStats} = statsSlice.actions;
export default statsSlice.reducer;