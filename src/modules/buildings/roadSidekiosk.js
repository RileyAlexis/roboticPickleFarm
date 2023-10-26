import { storeInstance as store} from '../store';

export function runKiosk(building) {
    const state = store.getState();
    let pickles = state.resources.pickles[state.resources.pickles.length-1];
    let seedPrice = state.prices.seeds;
    let recurringCost = 0;
    if (building.active) {
        recurringCost = seedPrice[0] * building.selectedOption;
    }
    if (pickles >= (seedPrice[0] * building.selectedOption)) {

        store.dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: building.selectedOption }});
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: -(seedPrice[0] * building.selectedOption) }});
        store.dispatch({ type: 'buildings/cycleBuilding', payload: building.name });
        store.dispatch({ type: 'buildings/setActiveCost', payload: { title: building.name, value: recurringCost }});
    }

    
}