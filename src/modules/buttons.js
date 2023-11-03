import { storeInstance as store } from './store';
import { sendUpgrade } from './sendUpgrade';
import { formatNumber } from './utilFunction';

function plantSeed() {
    const state = store.getState();
    const cycles = state.stats.cycles;

    if (state.resources.seeds[state.resources.seeds.length - 1] > 0) {
        store.dispatch({ type: 'plants/addNewPlant', payload: 1 });
        store.dispatch({ type: 'log/addLog', payload: { line: 'New Seedling Planted!', cycle: cycles } });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: -1 } });
    } else if (state.resources.seeds[state.resources.seeds.length - 1] === 0) {
        store.dispatch({ type: 'log/addLog', payload: { line: 'No seeds to plant!', cycle: cycles } });
    }
}

function pickCucumbers() {
    const state = store.getState();
    const ripeCucumbers = state.stats.ripeCucumbers;
    const cycles = state.stats.cycles;
    let picked = 0;
    if (ripeCucumbers > 0) picked++;
    if (picked >= 1) {
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: picked } });
        store.dispatch({ type: 'stats/changeStat', payload: { title: 'ripeCucumbers', value: -picked } });
    }
}
//Runs basic Make Pickles button - defaults to 5 at a time
function makePickles() {
    const state = store.getState();
    const cucumbers = state.resources.cucumbers[state.resources.cucumbers.length - 1];
    const cycles = state.stats.cycles;

    if (cucumbers >= 5) {
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: -5 } });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: +5 } });
        store.dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: +5 } })
        store.dispatch({ type: 'log/addLog', payload: { line: '5 Pickles pickled!', cycle: cycles } });
    } else if (cucumbers < 5) {
        store.dispatch({ type: 'log/addLog', payload: { line: 'Not Enough Cucumbers! Need 5', cycle: cycles } });
    }
}

function buyBot(botType, qty) {
    const state = store.getState();
    const pickles = state.resources.pickles[state.resources.pickles.length - 1];
    const botPrice = state.prices.bots;
    const cycles = state.stats.cycles;
    if (botType === 'planter' && pickles >= (botPrice[0] * qty)) {
        store.dispatch({ type: 'robots/addBot', payload: { title: 'planter', value: qty } });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: -(botPrice[0] * qty) } });
        store.dispatch({ type: 'log/addLog', payload: { line: 'Planter Bot Purchased!', cycle: cycles } });
    } else if (botType === 'picker' && pickles >= (botPrice[0] * qty)) {
        store.dispatch({ type: 'robots/addBot', payload: { title: 'picker', value: qty } });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: -(botPrice[0] * qty) } });
        store.dispatch({ type: 'log/addLog', payload: { line: 'Picker Bot Purchased!', cycle: cycles } });
    } else if (botType === 'pickler' && pickles >= (botPrice[0] * qty)) {
        store.dispatch({ type: 'robots/addBot', payload: { title: 'pickler', value: qty } });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: -(botPrice[0] * qty) } });
        store.dispatch({ type: 'log/addLog', payload: { line: 'Pickler Bot Purchased!', cycle: cycles } });
    } else if (pickles < (botPrice[0] * qty)) {
        store.dispatch({ type: 'log/addLog', payload: { line: `Need ${formatNumber((botPrice[0] * qty))} pickles to purchase ${qty} bots`, cycle: cycles } });
    }
}

function buySeeds(count) {
    const state = store.getState();
    const pickles = state.resources.pickles[state.resources.pickles.length - 1];
    const seedPrice = state.prices.seeds;
    const cycles = state.stats.cycles;
    if ((pickles) >= (seedPrice[0] * count)) {
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: (seedPrice[1] * count) } });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: -(seedPrice[0] * count) } })
        if (count === 1) {
            store.dispatch({ type: 'log/addLog', payload: { line: `Seed Purchased for ${seedPrice[0]} pickles`, cycle: cycles } });
        } else if (count > 1) {
            store.dispatch({ type: 'log/addLog', payload: { line: `${count} Seeds Purchased for ${seedPrice[0] * count} pickles`, cycle: cycles } });
        }
    } else {
        store.dispatch({ type: 'log/addLog', payload: { line: `Need ${(seedPrice[0] * count)} pickles to purchase ${count} seeds`, cycle: cycles } });
    }
}

const buyBuilding = (item) => {
    const state = store.getState();
    const pickles = state.resources.pickles[state.resources.pickles.length - 1];
    const cycles = state.stats.cycles;
    if (pickles >= item.price && !item.purchased) {
        store.dispatch({ type: 'buildings/buyBuilding', payload: item.name });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: -item.price } });
        store.dispatch({ type: 'buildings/disableItem', payload: item.name });
    } else {
        store.dispatch({ type: 'log/addLog', payload: { line: `Need ${(formatNumber(item.price))} pickles to purchase ${item.name}`, cycle: cycles } });
    }
}
//Calls proper engine function for buttons rendered from redux store objects
export const buttonCall = (name, upgrade) => {
    switch (name) {
        case 'Plant': plantSeed(); break;
        case 'Pick': pickCucumbers(); break;
        case 'Pickle': makePickles(); break;
        case 'Buy Planter Bot': buyBot('planter', 1); break;
        case 'Buy Picker Bot': buyBot('picker', 1); break;
        case 'Buy Pickler Bot': buyBot('pickler', 1); break;
        case 'Buy 10 Planter Bots': buyBot('planter', 10); break;
        case 'Buy 10 Picker Bots': buyBot('picker', 10); break;
        case 'Buy 10 Pickler Bots': buyBot('pickler', 10); break;
        case 'Buy 100 Planter Bots': buyBot('planter', 100); break;
        case 'Buy 100 Picker Bots': buyBot('picker', 100); break;
        case 'Buy 100 Pickler Bots': buyBot('pickler', 100); break;
        case 'Buy Seed': buySeeds(1); break;
        case 'Buy 10 Seeds': buySeeds(10); break;
        case 'Buy 100 Seeds': buySeeds(100); break;
        case 'upgrade': sendUpgrade(upgrade); break;
        case 'buyBuilding': buyBuilding(upgrade); break;
    }
}