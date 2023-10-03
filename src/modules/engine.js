import store from './store';

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

export function updateTicker() {
    const state = store.getState();
    const plants = state.plants;
    const resources = state.resources;
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
        plant.currentYield += (plant.growthRate * plant.modifier * plant.growthModifer) ;
        plant.age += plant.aging;
        //Once a whole cucumber is grown move it to ripeCucumbers
        if (!plant.dead && plant.currentYield >= 1) {
            store.dispatch({type: 'resources/changeResources', payload: {title: 'ripeCucumbers', value: 1}});
            plant.currentYield--;
        }
        if (plant.age > plant.maxAge) { 
            plant.dead = true;
        }
        } else if (!plant.dead && plant.currentYield >= plant.maxYield) {
            plant.maxedOut = true;
        } 
    }) //End ForEach loop

    //Reduce length of log before log dispatches
    if (log.length > 20) {
        const newLog = log.slice(-20);
        store.dispatch({type: 'log/setAllLog', payload: newLog });
    }
        const deadPlants = plants.filter((plant) => plant.dead);
        const maxedOut = plants.filter((plant) => plant.maxedOut);
        if (deadPlants > 0) {
            store.dispatch({type: 'log/addLog', payload: `${deadPlants.length} died of natural causes`});
        }
        if (maxedOut > 0) {
            store.dispatch({type: 'log/addLog', payload: `${maxedOut.length} plants have cucumbers rotting on the vine!`});
        }
        //Delete dead plants from object
        plants.filter((plant) => !plant.dead);
        //Update plants state variable
        store.dispatch({type: 'plants/setAllPlants', payload: plants});
 }
 
}

export function plantSeed() {
    const state = store.getState();

    if (state.resources.seeds > 0) {
        const decon = state.plantSettings;
        const newPlant = new Plants(decon.modifier, decon.growthRate, decon.growthModifer, decon.maxYield, decon.deathChance, decon.aging, decon.maxAge, decon.seedChance);
        console.log('New Plant ===========', state.plantSettings);
        store.dispatch({type: 'plants/addNewPlant', payload: newPlant});
        store.dispatch({type: 'log/addLog', payload: 'New Seedling Planted!'});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'seeds', value: -1}});
    } else if (state.resources.seeds === 0) {
        store.dispatch({type: 'log/addLog', payload: 'No seeds to plant!'});
    }
}

export function pickCucumbers() {
    const state = store.getState();
    const cucumbers = state.resources.cucumbers;
    const ripeCucumbers = state.resources.ripeCucumbers;

    if (ripeCucumbers > 0) {
        store.dispatch({type: 'resources/changeResources', payload: {title: 'cucumbers', value: 1}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'ripeCucumbers', value: -1}});
    }
    
}

export function makePickles() {
    const state = store.getState();
    const pickles = state.resources.pickles;
    const cucumbers = state.resources.cucumbers;

    if (cucumbers >= 5) {
        store.dispatch({type: 'resources/changeResources', payload: {title: 'cucumbers', value: -5}});
        store.dispatch({type: 'resources/changeResources', payload: {title: 'pickles', value: +5}});
        store.dispatch({type: 'log/addLog', payload: '5 Pickles pickled!'});
    } else if (cucumbers < 5) {
        store.dispatch({type: 'log/addLog', payload: 'Not Enough Cucumbers! Need 5'});
    }
}

export function buyBot(botType) {
    console.log(botType);
}

export const buttonCallInit = (name) => {
    console.log(name);
    switch (name) {
        case 'Plant': plantSeed(); break;
        case 'Pick': pickCucumbers(); break;
        case 'Pickle': makePickles(); break;
        case 'Buy Planter Bot': buyBot('Planter'); break;
        case 'Buy Picker Bot': buyBot('Picker'); break;
        case 'Buy Pickler Bot': buyBot('Pickler'); break;
    }
}