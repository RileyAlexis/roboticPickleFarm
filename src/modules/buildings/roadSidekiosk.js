import { storeInstance as store} from '../store';

export function runKiosk(building) {
    const state = store.getState();
    let seeds = state.resources.seeds[state.resources.seeds.length-1];
    let pickles = state.resources.pickles[state.resources.pickles.length-1];
    let seedPrice = state.prices.seeds;

    if (seeds === 0 && pickles >= (seedPrice[0] * building.selectedOption)) {

        store.dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: building.selectedOption }});
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: -(seedPrice[0] * building.selectedOption) }});
        store.dispatch({ type: 'buildings/cycleBuilding', payload: building.name });
    }

    
}