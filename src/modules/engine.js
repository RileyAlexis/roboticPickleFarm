import { storeInstance as store} from './store';
import { deepUnfreeze } from './deepUnfreeze';

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
    stats.averageAge = parseFloat(averageAge.toFixed(2));
    stats.totalGrowthRate = parseFloat(totalGrowthRate.toFixed(2));
    stats.cucumberProduction.push(ripeCucumbers);
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

} //End runPickerBots()

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
        log = log.splice(0, -20);
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
    stats.totalProduction += pickled;
    updateStats(plants, stats);
    
    
    store.dispatch({ type: 'plants/setAllPlants', payload: plants })
    store.dispatch({ type: 'stats/setAllStats', payload: stats });
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: picked - pickled}});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: pickled }});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: seeds }});
    store.dispatch( { type: 'log/setAllLog', payload: newLog });
} //End initial if statement

}//End updateTicker()