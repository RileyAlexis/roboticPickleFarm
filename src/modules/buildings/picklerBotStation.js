import { storeInstance as store } from '../store';
import { calculateTrend } from '../utilFunction';

export function runPicklerBotStation(building) {
    const state = store.getState();
    let cucumberTrend = calculateTrend(state.resources.cucumbers, 5);
    const picklerBotsRun = (state.robots.picklerBots * state.robots.picklerSpeed);
    let botPrice = state.prices.bots;
    let recurringCost = 0;
    //Purchases robots to keep up with picked cucumbers (if more than 300 buys additional bot(s))
    if (cucumberTrend.trend >= (picklerBotsRun / 300)) {
        if (building.active) (recurringCost = botPrice[0] * building.selectedOption);
        store.dispatch({ type: 'robots/addBot', payload: { title: 'pickler', value: building.selectedOption } });
        store.dispatch({ type: 'buildings/setActiveCost', payload: { title: building.name, value: recurringCost } });
        //Building cycle is for future use (does not currently affect any game mechanics)
        store.dispatch({ type: 'buildings/cycleBuilding', payload: building.name });
    }
}

