import { storeInstance as store} from './store';

export function sendUpgrade(upgrade) {
    const state = store.getState();
    if (state.resources.pickles[state.resources.pickles.length -1] >= upgrade.price) {
    store.dispatch(upgrade.dispatch);   
    console.log(upgrade);
    let regex = /^(.*?)-\s/;
    let match = upgrade.data.match(regex);
    const logLine = match[1].trim();
    store.dispatch({ type: 'upgrades/disableItem', payload: upgrade.name })
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value:  -upgrade.price}})
    store.dispatch({ type: 'log/addLog', payload: { line: `Upgrade Purchased! ${logLine}`}});
    } else {
        store.dispatch({type: 'log/addLog', payload: { line: `Not enough Pickles - need ${upgrade.price}`}});
    }

}