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

function cycleTheBots() {
    const state = store.getState();
    const planterBots = state.robots.planterBots;
    const planterSpeed = state.robots.planterSpeed;
    const pickerBots = state.robots.pickerBots;
    const pickerSpeed = state.robots.pickerSpeed;
    const picklerBots = state.robots.picklerBots;
    const picklerSpeed = state.robots.picklerSpeed;
    const plants = state.plants;
    const seeds = state.resources.seeds;
    const ripeCucumbers = state.stats.ripeCucumbers;
    const cucumbers = state.resources.cucumbers;

if (planterBots > 0 && planterSpeed > 0) {
    let planterRuns = (planterBots * planterSpeed > seeds) ? seeds : planterBots * planterSpeed;
        for (let i = 0; i < planterRuns; i++) {
    const decon = state.plantSettings;
    const newPlant = new Plants(decon.modifier, decon.growthRate, decon.growthModifer, decon.maxYield, decon.deathChance, decon.aging, decon.maxAge, decon.seedChance);
    console.log(newPlant);
    store.dispatch({type: 'plants/addNewPlant', payload: newPlant});
    store.dispatch({type: 'resources/changeResources', payload: {title: 'seeds', value: -1}});

    } //End For Loop
    } //end planterBots

if (pickerBots > 0 && pickerSpeed > 0) {
    let picked = 0;
    let pickerRuns = (pickerBots * pickerSpeed > ripeCucumbers) ? ripeCucumbers : pickerBots * pickerSpeed;
    
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

if (picklerBots > 0 && picklerSpeed > 0) {
    let pickled = 0;
    let picklerRuns = (picklerBots * picklerSpeed > cucumbers) ? cucumbers : picklerBots * picklerSpeed;

    for (let i = 0; i < picklerRuns; i++) {
        pickled++;
    }
    store.dispatch({type: 'resources/changeResources', payload: {title: 'cucumbers', value: -pickled}});
    store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: pickled}});
}
}

//Primary Update Engine - Runs 1 per second on default(set by gameSpeed)
export function updateTicker() {
    const state = store.getState();
    const plants = state.plants;
    const resources = state.resources;
    const cycles = state.stats.cycles;
    let ripeCucumbers = 0;
    let maxYield = 0;
    let totalGrowthRate = 0;
    const robots = state.robots;
    const log = state.log;

    //Plant production Calculations
 if (plants.length > 0) {
    plants.forEach((plant) => {
        if (!plant.dead) {
            //Add 1 seed to resources based on seedChance rate
            const seedRoll = Math.random();
            if (seedRoll <= plant.seedChance) {
                store.dispatch({type: 'resources/changeResources', payload: {title: 'seeds', value: 1}});
            }
        }
        //Sets the cyclical growth of each plant
        if (!plant.dead && plant.currentYield < plant.maxYield) {
            plant.maxedOut = false;
        plant.currentYield += (plant.growthRate * (plant.modifier + plant.growthModifer)) ;
        plant.age += plant.aging;

        } else if (!plant.dead && plant.currentYield >= plant.maxYield) {
            plant.maxedOut = true;
            plant.currentYield = plant.maxYield;
        }
        if (plant.age > plant.maxAge) { 
            plant.dead = true;
        }
        //Compile stats from each plant to dispatch after loop exits
        plant.currentYield >=1 ? ripeCucumbers += Math.floor(plant.currentYield) : ripeCucumbers += 0;
        maxYield += plant.maxYield;
        totalGrowthRate += plant.growthRate * (plant.modifier + plant.growthModifer);

    }) //End ForEach loop
    
    //Dispatch total current yield, max yield and total Growth Rate to state stats reducer
    store.dispatch({type: 'stats/setStats', payload: {title: 'ripeCucumbers', value: ripeCucumbers}});
    store.dispatch({type: 'stats/setStats', payload: {title: 'maxYield', value: maxYield}});
    store.dispatch({type: 'stats/setStats', payload: {title: 'totalGrowthRate', value: totalGrowthRate}});
    store.dispatch({type: 'stats/runCycle'});

    //Caclulate average plant age and dispatch to stats reducer
    const sum = plants.reduce((accumulator, obj) => {
        return accumulator + obj.age;
      }, 0);
      const average = sum / plants.length;
      store.dispatch({type: 'stats/setStats', payload: {title: 'averageAge', value: average}});


    //Reduce length of log before log dispatches
    if (log.length > 20) {
        const newLog = log.slice(-20);
        store.dispatch({type: 'log/setAllLog', payload: newLog });
    } 
        const deadPlants = plants.filter((plant) => plant.dead);
        const maxedOut = plants.filter((plant) => plant.maxedOut);
        if (deadPlants.length > 0) {
            store.dispatch({type: 'log/addLog', payload: {line: `${deadPlants.length} died of natural causes`, cycle: cycles}});
        }
        if (maxedOut.length > 0) {
        }
        //Delete dead plants from object
        plants.filter((plant) => !plant.dead);
        //Update plants state variable
        store.dispatch({type: 'plants/setAllPlants', payload: plants});
 }
 cycleTheBots();
}

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
    const plants = state.plants;
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

    if (pickles >= seedPrice[0]) {
        console.log('Buy Seeds running');
        store.dispatch({type: 'resources/changeResources', payload: {title: 'seeds', value: seedPrice[1]}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: -seedPrice[0]}})
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
        case 'Buy Seeds': buySeeds(); break;
    }
}