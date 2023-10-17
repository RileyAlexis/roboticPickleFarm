import { storeInstance as store} from './store';
import { deepUnfreeze } from './deepUnfreeze';
import { condensor } from './condensor';
import { countPlants, averageProperty } from './utilFunction';
import { checkButtons } from './events';

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
        if (!plant.isDead) {
        plant.currentYield += ((plant.growthRate + plant.growthModifer) * plant.modifier);
        plant.age += plant.aging * plant.modifier;
        }
        if (plant.age > plant.maxAge) {
            plant.dead = true;
        }
        if (plant.currentYield >= plant.maxYield) plant.currentYield = plant.maxYield;
    });
    let deadPlants = plants.filter((plant) => !plant.dead);
    store.dispatch({ type: 'log/addLog', payload: `${deadPlants.length} plants have been retired`});
    return [...plants];
}

function generateSeeds(plants) {
    let newSeeds = 0;
    for (let i = 0; i < plants.length; i++) {
        const seed = Math.random();
        if (plants[i].seedChance * plants[i].modifier >= seed) {
            newSeeds += 1;
        }
    }
    return newSeeds;
}

function updateStats(plants, stats) {
    let totalGrowthRate = 0;
    let averageAge = 0;
    let maxYield = 0;
    let ripeCucumbers = 0;
    let plantsQty = countPlants(plants);

    plants.forEach((plant) => {
        ripeCucumbers += Math.floor(plant.currentYield);
        totalGrowthRate += (plant.growthRate + plant.growthModifer) * plant.modifier;
        averageAge += plant.age;
        maxYield += plant.maxYield;
    });

    stats.averageAge = averageAge / plantsQty;
    stats.totalGrowthRate = totalGrowthRate;
    stats.maxYield = maxYield;
    stats.ripeCucumbers = ripeCucumbers;
    stats.averageAge = parseFloat(averageAge.toFixed(2));
    stats.totalGrowthRate = parseFloat(totalGrowthRate.toFixed(2));
    stats.cycles += 1;
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
    let picklerRuns = (robots.picklerBots * robots.picklerSpeed > resources.cucumbers[resources.cucumbers.length-1])
    ? resources.cucumbers[resources.cucumbers.length-1]
    : robots.picklerBots * robots.picklerSpeed;

    for (let i = 0; i < picklerRuns; i++) {
        pickled++;
    } //End picklerRuns for loop
    return pickled;
} //End picklerBots();

function runPlanterBots(plants, resources, robots, plantSettings) {
    let seeds = 0;
    let planterRuns = (robots.planterBots * robots.planterSpeed > resources.seeds[resources.seeds.length-1])
    ? resources.seeds[resources.seeds.length-1]
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
    
    //Prevents more than 10,000 objects being created - uses plants.modifier to maintain numbers
    if (plants.length >= 10000) {
        plants = condensor(plants);
    }

 if (plants.length > 0) {
    growPlants(plants);
    let newSeeds = generateSeeds(plants);
    let picked = runPickerBots(plants, robots, stats);
    let pickled = runPicklerBots(resources, robots, stats);
    let seeds = runPlanterBots(plants, resources, robots, plantSettings);
    
    let newLog = cycleLog(log);
    stats.totalProduction += pickled;
    updateStats(plants, stats);
    
    console.log(plants[1].age, averageProperty(plants, 'age'))
        


    if (state.deltas.buttonDelta >= 5) {
        checkButtons();
        store.dispatch({ type: 'deltas/resetDelta', payload: 'resetButtonDelta' });
    }

    store.dispatch({ type: 'plants/setAllPlants', payload: plants })
    store.dispatch({ type: 'stats/setAllStats', payload: stats });
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: picked - pickled}});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: pickled }});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: seeds + newSeeds }});
    store.dispatch({ type: 'log/setAllLog', payload: newLog });
    store.dispatch({ type: 'deltas/cycleDeltas' });
} //End initial if statement

}//End updateTicker()