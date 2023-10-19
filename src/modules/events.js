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

export function checkTabs() {
    const state = store.getState();
    console.log('Check Tabs running');
    if (state.resources.pickles[state.resources.pickles.length-1] >= 100 && !state.locationMenu[1].show) {
        store.dispatch({ type: 'locationMenu/showItem', payload: 'Robots'});
    }
    if (state.resources.pickles[state.resources.pickles.length-1] >= 500 && !state.locationMenu[3].show) {
        store.dispatch({ type: 'locationMenu/showItem', payload: 'Upgrades'});
    }
}

export function checkUpgrades(totalProduction, upgrades) {
    console.log('Check Upgrades Running', upgrades);
    for (let i = 0; i < upgrades.length; i++) {
        if(upgrades[i].showAt >= totalProduction && !upgrades[i].show) {
            console.log(upgrades[i]);
            store.dispatch({ type: 'upgrades/showItem', payload: upgrades[i].name });
        }
    }
}