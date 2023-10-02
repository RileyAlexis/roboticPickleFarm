import axios from 'axios';
import store from './store';

export function moduleFunction() {
    const state = store.getState();
    console.log(state);
    
    //Commented code returns error "e not defined"
    // const dispatch = store.dispatch(); 
    // store.dispatch({type: 'SET_GAMEID', payload: 200});
    const updateAction = { type: 'SET_GAMEID', payload: 600};
    return updateAction;
    
}

export const thunkMiddleFunction = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return next(action);
}
