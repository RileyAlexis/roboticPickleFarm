import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: 'farm', title: 'Farm', show: true },
    {id: 'robots', title: 'Robots', show: false },
    {id: 'buildings', title: 'Buildings', show: false },
    {id: 'powerUps', title: 'Power Ups', show:false },
];

    export const locationMenuSlice = createSlice({
        name: 'locationMenu',
        initialState: initialState,
        reducers: {
            toggleItem: (state, action) => {
                for (let i in state) {
                    if (state[i].name === action.payload) {
                        state[i].show = !state[i].show;
                    }
                    return [...state];
                }
            }
        }
    })

    export const { toggleItem } = locationMenuSlice.actions;

    export default locationMenuSlice.reducer;