import { storeInstance as store} from './store';
import { Plants } from './engine';
import { deepUnfreeze } from './deepUnfreeze';
import { sendUpgrade } from './sendUpgrade';
import { formatNumber } from './utilFunction';

function plantSeed() {
    const state = store.getState();
    const cycles = state.stats.cycles;

    if (state.resources.seeds[state.resources.seeds.length-1] > 0) {
        const decon = state.plantSettings;
        const newPlant = new Plants(decon.modifier, decon.growthRate, decon.growthModifer, decon.maxYield, decon.deathChance, decon.aging, decon.maxAge, decon.seedChance);
        store.dispatch({type: 'plants/addNewPlant', payload: newPlant});
        store.dispatch({type: 'log/addLog', payload: {line: 'New Seedling Planted!', cycle: cycles}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'seeds', value: -1}});
    } else if (state.resources.seeds[state.resources.seeds.length-1] === 0) {
        store.dispatch({type: 'log/addLog', payload: {line: 'No seeds to plant!', cycle: cycles }});
    }
}

function pickCucumbers() {
    const state = store.getState();
    const plants = deepUnfreeze([...state.plants]);
    const cycles = state.stats.cycles;
    let picked = 0;

    for (let i = 0; i < plants.length; i++) {
        if (plants[i].currentYield >= 1) {
            plants[i].currentYield--;
            plants[i].maxedOut = false;
            picked++;
            break;
        }
    }
    if (picked >= 1) {
        store.dispatch({type: 'resources/changeResources', payload: {title: 'cucumbers', value: 1}});
        store.dispatch({ type: 'plants/setAllPlants', payload: plants })
    }
    }

function makePickles() {
    const state = store.getState();
    const cucumbers = state.resources.cucumbers[state.resources.cucumbers.length-1];
    const cycles = state.stats.cycles;

    if (cucumbers >= 5) {
        store.dispatch({type: 'resources/changeResources', payload: {title: 'cucumbers', value: -5}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: +5}});
        store.dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: +5}})
        store.dispatch({type: 'log/addLog', payload: {line: '5 Pickles pickled!', cycle: cycles}});
    } else if (cucumbers < 5) {
        store.dispatch({type: 'log/addLog', payload: {line: 'Not Enough Cucumbers! Need 5', cycle: cycles}});
    }
}

function buyBot(botType) {
    const state = store.getState();
    const pickles = state.resources.pickles[state.resources.pickles.length-1];
    const botPrice = state.prices.bots;
    const cycles = state.stats.cycles;
    if (botType === 'planter' && pickles >= botPrice[0]) {
        store.dispatch({type: 'robots/addBot', payload: { title: 'planter', value: botPrice[1]}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: -botPrice[0] }});
        store.dispatch({type: 'log/addLog', payload: {line: 'Planter Bot Purchased!', cycle: cycles}});
    } else if (botType === 'picker' && pickles >= botPrice[0]) {
        store.dispatch({type: 'robots/addBot', payload: { title: 'picker', value: botPrice[1]}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: -botPrice[0] }});
        store.dispatch({type: 'log/addLog', payload: {line: 'Picker Bot Purchased!', cycle: cycles}});
    } else if (botType === 'pickler' && pickles >= botPrice[0]) {
        store.dispatch({type: 'robots/addBot', payload: { title: 'pickler', value: botPrice[1]}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: -botPrice[0] }});
        store.dispatch({type: 'log/addLog', payload: {line: 'Pickler Bot Purchased!', cycle: cycles}});
    } else if (pickles < botPrice[0]) {
        store.dispatch({type: 'log/addLog', payload: {line: `Need ${botPrice[0]} pickles to purchase a bot`, cycle: cycles}});
    }
}

function buySeeds(count) {
    const state = store.getState();
    const pickles = state.resources.pickles[state.resources.pickles.length-1];
    const seedPrice = state.prices.seeds;
    const cycles = state.stats.cycles;
    if ((pickles) >= ( seedPrice[0] * count)) {
        store.dispatch({type: 'resources/changeResources', payload: {title: 'seeds', value: (seedPrice[1] * count)}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: -(seedPrice[0] * count)}})
        if (count === 1 ) {
        store.dispatch({type: 'log/addLog', payload: {line: `Seed Purchased for ${seedPrice[0]} pickles`, cycle: cycles}});
        } else if (count > 1) {
            store.dispatch({type: 'log/addLog', payload: {line: `${count} Seeds Purchased for ${seedPrice[0] * count} pickles`, cycle: cycles}});   
        }
    } else {
        store.dispatch({type: 'log/addLog', payload: {line: `Need ${(seedPrice[0] * count)} pickles to purchase ${count} seeds`, cycle: cycles}});
    }
}

const buyBuilding = (item) => {
    const state = store.getState();
    const pickles = state.resources.pickles[state.resources.pickles.length-1];
    const cycles = state.stats.cycles;
    if (pickles >= item.price && !item.purchased) {
        store.dispatch({ type: 'buildings/buyBuilding', payload: item.name });
        store.dispatch({ type: 'resources/changeResources', payload: {title: 'pickles', value: -item.price}});
        store.dispatch({ type: 'buildings/disableItem', payload: item.name });
    } else {
        store.dispatch({type: 'log/addLog', payload: {line: `Need ${(formatNumber(item.price))} pickles to purchase ${item.name}`, cycle: cycles}});
    }
}

export const buttonCall = (name, upgrade) => {
    switch (name) {
        case 'Plant': plantSeed(); break;
        case 'Pick': pickCucumbers(); break;
        case 'Pickle': makePickles(); break;
        case 'Buy Planter Bot': buyBot('planter'); break;
        case 'Buy Picker Bot': buyBot('picker'); break;
        case 'Buy Pickler Bot': buyBot('pickler'); break;
        case 'Buy Seed': buySeeds(1); break;
        case 'Buy 10 Seeds': buySeeds(10); break;
        case 'Buy 100 Seeds': buySeeds(100);break;
        case 'upgrade': sendUpgrade(upgrade); break;
        case 'buyBuilding': buyBuilding(upgrade); break;
    }
}