import { storeInstance as store} from './store';

export function sendUpgrade(upgrade,dispatch) {
    store.dispatch(dispatch);   
    console.log(upgrade);
    store.dispatch({type: 'upgrades/disableItem', payload: upgrade })
}