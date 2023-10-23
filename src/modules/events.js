import { storeInstance as store} from './store';

export function checkButtons() {
    const state = store.getState();
    const pickles = state.resources.pickles[state.resources.pickles.length-1];
    const farmMenu = state.farmMenu;

    for (let i = 0; i < farmMenu.length; i++) {
        if (pickles >= farmMenu[i].showAt && !farmMenu[i].show) {
            store.dispatch({ type: 'farmMenu/showItem', payload: farmMenu[i].name});
        }
    }

    if (state.stats.ripeCucumbers > 0 && !state.farmMenu[1].show) {
        store.dispatch({ type: 'farmMenu/showItem', payload: 'Pick' });
    }
    if (state.resources.cucumbers[state.resources.cucumbers.length-1] >= 5 && !state.farmMenu[2].show) {
        store.dispatch({ type: 'farmMenu/showItem', payload: 'Pickle' });
    }
}

export function checkTabs() {
    const state = store.getState();
    if (state.resources.pickles[state.resources.pickles.length-1] >= 100 && !state.locationMenu[1].show) {
        store.dispatch({ type: 'locationMenu/showItem', payload: 'Robots'});
    }
    if (state.resources.pickles[state.resources.pickles.length-1] >= 500 && !state.locationMenu[3].show) {
        store.dispatch({ type: 'locationMenu/showItem', payload: 'Upgrades'});
    }
}

export function checkUpgrades(totalProduction, upgrades) {
    for (let i = 0; i < upgrades.length; i++) {
        if(totalProduction >= upgrades[i].showAt && !upgrades[i].show) {
            store.dispatch({ type: 'upgrades/showItem', payload: upgrades[i].name });
        }
    }
}