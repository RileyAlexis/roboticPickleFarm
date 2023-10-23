import { createSlice } from "@reduxjs/toolkit";

const initialState = 
    [
        {name: 'Plant', 
            coolDown: 4000, 
            show: true,
            data: "Start a new cucumber plant" 
        },
        {name: 'Pick', 
            coolDown: 2000, 
            show: false, 
            data: "Pick 1 ripe cucumber" 
        },
        {name: 'Pickle', 
            coolDown: 5000, 
            show: false, 
            data: "Make 5 pickles" 
        },
        {name: 'Buy Seed', 
            coolDown:2000, 
            show: false, 
            showAt: 50,
            data: "Buy 1 Seed to plant" 
        },
        {name: 'Buy 10 Seeds',
            coolDown:2000,
            show: false,
            showAt: 1000,
            data: "Buy 10 Seeds to plant! / Cost 500"
        },
        {name: 'Buy 100 Seeds',
            coolDown: 2000,
            show: false,
            showAt: 10000,
            data: "Buy 100 Seeds to plant! / Cost 5000"
    
        }
    ];

    export const farmMenuSlice = createSlice({
        name: 'farmMenu',
        initialState: initialState,
        reducers: {
            toggleItem: (state, action) => {
                for (let i in state) {
                    if (state[i].name === action.payload) {
                        state[i].show = !state[i].show;
                    }
                    return [...state];
                }
            },
            changeName: (state, action) => {
                const title = action.payload.title;
                const value = action.payload.value;
                state[title] = value;                
            },
            showItem: (state, action) => {
                const title = action.payload;
                for (let i = 0; i < state.length; i++) {
                    if (state[i].name === title) {
                        state[i].show = true;
                        }
                    }
                }
        }
    })

    export const { toggleItem, changeName, showItem } = farmMenuSlice.actions;

    export default farmMenuSlice.reducer;