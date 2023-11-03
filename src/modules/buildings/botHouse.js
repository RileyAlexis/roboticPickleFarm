import { storeInstance as store} from '../store';

export function runBotHouse(building) {
    const state = store.getState();
    const totalGrowthRate = state.stats.totalGrowthRate;
    const pickerBotsRun = (state.robots.pickerBots * state.robots.pickerSpeed);
    let botPrice = state.prices.bots;
    let recurringCost = 0;
    //Purchases robots to keep up with plant growth
    if (totalGrowthRate > pickerBotsRun) {
        if (building.active) (recurringCost = botPrice[0] * building.selectedOption);
        store.dispatch({ type: 'robots/addBot', payload: { title: 'picker', value: building.selectedOption }});
        store.dispatch({ type: 'buildings/setActiveCost', payload: { title: building.name, value: recurringCost }});
        //Building cycle is for future use (does not currently affect any game mechanics)
        store.dispatch({ type: 'buildings/cycleBuilding', payload: building.name });
    }
}

