import { storeInstance as store} from './store';

class Plants {
    constructor(modifier, growthRate, growthModifer, maxYield, deathChance, aging, maxAge, seedChance) {
    this.modifier = modifier;
    this.growthRate = growthRate;
    this.growthModifer = growthModifer;
    this.maxYield = maxYield;
    this.deathChance = deathChance;
    this.aging = aging;
    this.maxAge = maxAge;
    this.age = 0;
    this.currentYield = 0;
    this.seedChance = seedChance;
    this.dead = false;
    this.maxedOut = false;
    }
}

function cycleTheBots(plants) {
    const state = store.getState();
    let planterBots = state.robots.planterBots;
    let planterSpeed = state.robots.planterSpeed;
    let pickerBots = state.robots.pickerBots;
    let pickerSpeed = state.robots.pickerSpeed;
    let picklerBots = state.robots.picklerBots;
    let picklerSpeed = state.robots.picklerSpeed;
    // let plants = deepUnfreeze([...state.plants]);
    let seeds = state.resources.seeds;
    let ripeCucumbers = state.stats.ripeCucumbers;
    let cucumbers = state.resources.cucumbers;
    let cycles = state.stats.cycles;
    let stats = state.stats;
    let newPlantsArr = [];

if (planterBots > 0 && planterSpeed > 0) {
    let planterRuns = (planterBots * planterSpeed > seeds) ? seeds : planterBots * planterSpeed;
    if (planterRuns > 0) {
    store.dispatch({type: 'stats/toggleActive', payload: {title: 'planter', value: cycles}});
    }
        for (let i = 0; i < planterRuns; i++) {
            const decon = state.plantSettings;
            const newPlant = new Plants(decon.modifier, decon.growthRate, decon.growthModifer, decon.maxYield, decon.deathChance, decon.aging, decon.maxAge, decon.seedChance);
            
            newPlantsArr.push(newPlant);
        store.dispatch({type: 'resources/changeResources', payload: {title: 'seeds', value: -1}});

    } //End For Loop
    } //end planterBots

if (pickerBots > 0 && pickerSpeed > 0) {
    let picked = 0;
    let pickerRuns = (pickerBots * pickerSpeed > ripeCucumbers) ? ripeCucumbers : pickerBots * pickerSpeed;
    
    store.dispatch({type: 'stats/toggleActive', payload: {title: 'picker', value: cycles}});
    
    for (let i = 0; i < pickerRuns; i++) {
        for (let i = 0; i < plants.length; i++) {
            if (plants[i].currentYield >= 1) {
                plants[i].currentYield--;
                picked++;
                break;
        } 
    } //End plants for loop
        if (picked >= 1) {
            store.dispatch({type: 'resources/changeResources', payload: {title: 'cucumbers', value: 1}});
            
        } 
        } //End pickerBot for loop
}//End pickerBots
// store.dispatch({type: 'plants/setAllPlants', payload: plants});

if (picklerBots > 0 && picklerSpeed > 0) {
    let pickled = 0;
    let picklerRuns = (picklerBots * picklerSpeed > cucumbers) ? cucumbers : picklerBots * picklerSpeed;
    store.dispatch({type: 'stats/toggleActive', payload: {title: 'pickler', value: cycles}});
    for (let i = 0; i < picklerRuns; i++) {
        pickled++;
    } //End for loop
    store.dispatch({type: 'resources/changeResources', payload: {title: 'cucumbers', value: -pickled}});
    store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: pickled}});
} //end PicklerBots

if ((stats.planterDelta - stats.cycles) < 3 && stats.planterActive) {
    store.dispatch({type: 'stats/toggleActive', payload: {title: 'planter', value: cycles}});
}
if ((stats.pickerDelta - stats.cycles) > 3 && stats.pickerActive) {
    store.dispatch({type: 'stats/toggleActive', payload: {title: 'picker', value: cycles}});
}
if ((stats.picklerDelta - stats.cycles) > 3 && stats.picklerActive) {
    store.dispatch({type: 'stats/toggleActive', payload: {title: 'pickler', value: cycles}});
}

return [...plants, newPlantsArr];

} //End CycleBots

//Plants array-object must be deeep unfrozen prior to calculations
function deepUnfreeze(item) {

    if (Array.isArray(item)) {
        // If it's an array, create a new array and recursively deep unfreeze its elements
        return item.map(deepUnfreeze);
    } else if (typeof item === 'object' && item !== null && Object.isFrozen(item)) {
        // If it's a frozen object, create a shallow copy and recursively deep unfreeze its properties
        const unfrozenObject = Object.assign({}, item);
        Object.keys(unfrozenObject).forEach(function (key) {
            unfrozenObject[key] = deepUnfreeze(unfrozenObject[key]);
        });
        return unfrozenObject;
    }
    // If it's not an array or a frozen object, return it directly
    return item;
}

function newCycleBots(plants) {
    const state = store.getState();
    const decon = state.plantSettings;
        const newPlant = new Plants(decon.modifier, decon.growthRate, decon.growthModifer, decon.maxYield, decon.deathChance, decon.aging, decon.maxAge, decon.seedChance);

    return [...plants, newPlant];
}

function growPlants(plants) {
    plants.forEach((plant) => {
        plant.currentYield += ((plant.growthRate + plant.growthModifer) * plant.modifier);
        if (plant.currentYield >= plant.maxYield) plant.currentYield = plant.maxYield;
    });
    return [...plants];
}

function updateStats(plants, stats) {
    let totalGrowthRate = 0;
    let averageAge = 0;
    let maxYield = 0;
    let ripeCucumbers = 0;

    plants.forEach((plant) => {
        ripeCucumbers += Math.floor(plant.currentYield);
        totalGrowthRate += (plant.growthRate + plant.growthModifer) * plant.modifier;
        averageAge += plant.age;
        maxYield += plant.maxYield;
    });

    stats.averageAge = averageAge / plants.length;
    stats.totalGrowthRate = totalGrowthRate;
    stats.maxYield = maxYield;
    stats.ripeCucumbers = ripeCucumbers;
    return [stats];
}

function runPickerBots(plants, robots, stats) {
    let picked = 0;
    let pickerRuns = (robots.pickerBots * robots.pickerSpeed > stats.ripeCucumbers) 
    ? stats.ripeCucumbers 
    : robots.pickerBots * robots.pickerSpeed;
    
    stats.pickerActive = true;
    for (let i = 0; i < pickerRuns; i++) {
        for (let i = 0; i < plants.length; i++) {
            if (plants[i].currentYield >= 1) {
                plants[i].currentYield--;
                picked++;
                break;
        }  //End If
    } //End plants for loop
    } //End pickerRuns for loop

    return [...plants], picked;

} //Ene runPickerBots()

//Primary Update Engine - Runs 1 per second on default(set by gameSpeed)
export function updateTicker() {
    const state = store.getState();
    let plants = deepUnfreeze([...state.plants]);
    let stats = deepUnfreeze(state.stats);
    const robots = state.robots;
    

    //Plant production Calculations
    // console.log('Is Frozen', Object.isFrozen(plants));
    // console.log('Is Sealed', Object.isSealed(plants));
 if (plants.length > 0) {
    growPlants(plants);
    let picked = runPickerBots(plants, robots, stats);
    updateStats(plants, stats);
    
    
    
    
    store.dispatch({ type: 'plants/setAllPlants', payload: plants })
    store.dispatch({ type: 'stats/setStats', payload: { title: 'maxYield', value: stats.maxYield }});
    store.dispatch({ type: 'stats/setStats', payload: { title: 'totalGrowthRate', value: stats.totalGrowthRate }});
    store.dispatch({ type: 'stats/setStats', payload: { title: 'averageAge', value: stats.averageAge }});
    store.dispatch({ type: 'stats/setStats', payload: { title: 'ripeCucumbers', value: stats.ripeCucumbers }});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: picked }})
} //End initial if statement

}//End updateTicker()

export function plantSeed() {
    const state = store.getState();
    const cycles = state.stats.cycles;

    if (state.resources.seeds > 0) {
        const decon = state.plantSettings;
        const newPlant = new Plants(decon.modifier, decon.growthRate, decon.growthModifer, decon.maxYield, decon.deathChance, decon.aging, decon.maxAge, decon.seedChance);
        store.dispatch({type: 'plants/addNewPlant', payload: newPlant});
        store.dispatch({type: 'log/addLog', payload: {line: 'New Seedling Planted!', cycle: cycles}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'seeds', value: -1}});
    } else if (state.resources.seeds === 0) {
        store.dispatch({type: 'log/addLog', payload: {line: 'No seeds to plant!', cycle: cycles }});
    }
}

export function pickCucumbers() {
    const state = store.getState();
    const plants = deepUnfreeze([...state.plants]);
    const cycles = state.stats.cycles;
    let picked = 0;

    for (let i = 0; i < plants.length; i++) {
        if (plants[i].currentYield >= 1) {
            plants[i].currentYield--;
            picked++;
            break;
        }
    }
    if (picked >= 1) {
        store.dispatch({type: 'resources/changeResources', payload: {title: 'cucumbers', value: 1}});
        store.dispatch({ type: 'plants/setAllPlants', payload: plants })
    }
    }

export function makePickles() {
    const state = store.getState();
    const cucumbers = state.resources.cucumbers;
    const cycles = state.stats.cycles;

    if (cucumbers >= 5) {
        store.dispatch({type: 'resources/changeResources', payload: {title: 'cucumbers', value: -5}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: +5}});
        store.dispatch({type: 'log/addLog', payload: {line: '5 Pickles pickled!', cycle: cycles}});
    } else if (cucumbers < 5) {
        store.dispatch({type: 'log/addLog', payload: {line: 'Not Enough Cucumbers! Need 5', cycle: cycles}});
    }
}

export function buyBot(botType) {
    const state = store.getState();
    const pickles = state.resources.pickles;
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

function buySeeds() {
    const state = store.getState();
    const pickles = state.resources.pickles;
    const seedPrice = state.prices.seeds;
    const cycles = state.stats.cycles;

    if (pickles >= seedPrice[0]) {
        console.log('Buy Seeds running');
        store.dispatch({type: 'resources/changeResources', payload: {title: 'seeds', value: seedPrice[1]}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: -seedPrice[0]}})
        store.dispatch({type: 'log/addLog', payload: {line: `Seed Purchased for ${seedPrice[0]} pickles`, cycle: cycles}});
    } else {
        store.dispatch({type: 'log/addLog', payload: {line: `Need ${seedPrice[0]} pickles to purchase a seed`, cycle: cycles}});
    }
}

export const buttonCall = (name) => {
    console.log(name);
    switch (name) {
        case 'Plant': plantSeed(); break;
        case 'Pick': pickCucumbers(); break;
        case 'Pickle': makePickles(); break;
        case 'Buy Planter Bot': buyBot('planter'); break;
        case 'Buy Picker Bot': buyBot('picker'); break;
        case 'Buy Pickler Bot': buyBot('pickler'); break;
        case 'Buy Seed': buySeeds(); break;
    }
}