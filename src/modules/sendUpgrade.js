import { storeInstance as store } from './store';
import { formatNumber } from './utilFunction';

//Upgrades contain all necessary dispatches in an array declared during initialization of the redux store.
//This function checks if a player has enough resources to purchas and upgrade and then runs the array of dispatches
export function sendUpgrade(upgrade) {
    const state = store.getState();
    const cycles = state.stats.cycles;

    if (state.resources.pickles[state.resources.pickles.length - 1] >= upgrade.price) {
        upgrade.dispatch.forEach(item => {
            store.dispatch(item);
        })

        //After the upgrade dispatches have been applied the button is disabled, the player charged the price and a log entry made
        store.dispatch({ type: 'upgrades/disableItem', payload: upgrade.name })
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: -upgrade.price } })
        store.dispatch({ type: 'log/addLog', payload: { line: `Upgrade Purchased! ${upgrade.log}`, cycle: cycles } });
    } else {
        store.dispatch({ type: 'log/addLog', payload: { line: `Not enough Pickles - need ${formatNumber(upgrade.price)}`, cycle: cycles } });
    }

}