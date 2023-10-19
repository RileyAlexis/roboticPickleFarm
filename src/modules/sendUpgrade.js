import { storeInstance as store} from './store';

export function sendUpgrade(upgrade) {
    store.dispatch(upgrade.dispatch);   
    console.log(upgrade);
    store.dispatch({ type: 'upgrades/disableItem', payload: upgrade.name })
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value:  -upgrade.price}})
}