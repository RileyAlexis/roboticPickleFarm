import { storeInstance as store} from './store';

export class Plants {
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

//Plants array-object must be deeep unfrozen prior to calculations
export function deepUnfreeze(item) {

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

function runPicklerBots(resources, robots) {
    let pickled = 0;
    let picklerRuns = (robots.picklerBots * robots.picklerSpeed > resources.cucumbers)
    ? resources.cucumbers
    : robots.picklerBots * robots.picklerSpeed;

    for (let i = 0; i < picklerRuns; i++) {
        pickled++;
    } //End picklerRuns for loop
    return pickled;
} //End picklerBots();

function runPlanterBots(plants, resources, robots, plantSettings) {
    let seeds = 0;
    let planterRuns = (robots.planterBots * robots.planterSpeed > resources.seeds)
    ? resources.seeds
    : robots.planterBots * robots.planterSpeed;

    for (let i = 0; i < planterRuns; i++) {
        const newPlant = new Plants(plantSettings.modifier, plantSettings.growthRate, plantSettings.growthModifer, plantSettings.maxYield, plantSettings.deathChance, plantSettings.aging, plantSettings.maxAge, plantSettings.seedChance);
        plants.push(newPlant);
        seeds--;
    }
    return [...plants], seeds;
}

function cycleLog(log) {
    if (log.length > 20) {
        log = log.splice(0, 20);
        console.log(log);
    }
    return log;
}

//Primary Update Engine - Runs 1 per second on default(set by gameSpeed)
export function updateTicker() {
    const state = store.getState();
    let plants = deepUnfreeze([...state.plants]);
    let stats = deepUnfreeze(state.stats);
    const robots = state.robots;
    const resources = state.resources;
    const plantSettings = state.plantSettings;
    const log = deepUnfreeze(state.log);
    //Plant production Calculations
    // console.log('Is Frozen', Object.isFrozen(plants));
    // console.log('Is Sealed', Object.isSealed(plants));
 if (plants.length > 0) {
    growPlants(plants);
    let picked = runPickerBots(plants, robots, stats);
    let pickled = runPicklerBots(resources, robots);
    let seeds = runPlanterBots(plants, resources, robots, plantSettings);
    let newLog = cycleLog(log);
    updateStats(plants, stats);
    
    
    store.dispatch({ type: 'plants/setAllPlants', payload: plants })
    store.dispatch({ type: 'stats/setStats', payload: { title: 'maxYield', value: stats.maxYield }});
    store.dispatch({ type: 'stats/setStats', payload: { title: 'totalGrowthRate', value: stats.totalGrowthRate }});
    store.dispatch({ type: 'stats/setStats', payload: { title: 'averageAge', value: stats.averageAge }});
    store.dispatch({ type: 'stats/setStats', payload: { title: 'ripeCucumbers', value: stats.ripeCucumbers }});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: picked - pickled}});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: pickled }});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: seeds }});
    store.dispatch( { type: 'log/setAllLog', payload: newLog });
} //End initial if statement

}//End updateTicker()