import { storeInstance as store} from './store';

export function checkButtons() {
    const state = store.getState();

    if (state.stats.ripeCucumbers > 0 && !state.farmMenu[1].show) {
        store.dispatch({ type: 'farmMenu/showItem', payload: 'Pick' });
    }
    if (state.resources.cucumbers[state.resources.cucumbers.length-1] >= 5 && !state.farmMenu[2].show) {
        store.dispatch({ type: 'farmMenu/showItem', payload: 'Pickle' });
    }
    
    if (state.resources.pickles[state.resources.pickles.length-1] >= 50 && !state.farmMenu[3].show) {
        store.dispatch({ type: 'farmMenu/showItem', payload: 'Buy Seed' });
    }
}