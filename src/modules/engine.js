import { storeInstance as store} from './store';
import { deepUnfreeze } from './deepUnfreeze';
import { condensor } from './condensor';
import { countPlants } from './utilFunction';
import { checkButtons, checkTabs, checkUpgrades, checkBuildings } from './events';
import { getRecurringCost, runBuilding } from './cycleBuildings';

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
        if (plant.currentYield >= plant.maxYield) { 
            plant.currentYield = plant.maxYield;
            plant.maxedOut = true;
        }
    });
    let deadPlants = plants.filter((plant) => !plant.dead);
    // store.dispatch({ type: 'log/addLog', payload: `${deadPlants.length} plants have been retired`});
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

function updateStats(buildings, plants, stats) {
    let totalGrowthRate = 0;
    let averageAge = 0;
    let maxYield = 0;
    let ripeCucumbers = 0;
    let totalModifier = 0;
    let plantsQty = countPlants(plants);
    stats.totalMaxedOut = 0;

    plants.forEach((plant) => {
        ripeCucumbers += Math.floor(plant.currentYield);
        if (plant.maxedOut) { stats.totalMaxedOut++; }
        if (!plant.maxedOut) totalGrowthRate += (plant.growthRate + plant.growthModifer) * plant.modifier;
        if (plant.modifier > 1) totalModifier += plant.modifier;
        averageAge += plant.age;
        maxYield += plant.maxYield;
    });

    // totalGrowthRate = totalGrowthRate / (plants.length * totalModifier);

    buildings.forEach((item) => {
        if (buildings.active && buildings.purchased)
        stats.recurringCosts.push({building: item.name, cost: item.recurringCost});
    })

    //Reset visual cues for active bots
    if (stats.pickerDelta >= 3) { stats.pickerActive = false; stats.pickerDelta = 0}
    if (stats.planterDelta >= 3) { stats.planterActive = false; stats.planterDelta = 0}
    if (stats.picklerDelta >= 3) { stats.picklerActive = false; stats.picklerDelta = 0}

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
    let pickerRuns = robots.pickerBots * robots.pickerSpeed 

    if (pickerRuns > 0) {
    stats.pickerActive = true;
    stats.pickerDelta++;
    }
    
    for (let i = 0; i < (pickerRuns); i++) {
        for (let i = 0; i < plants.length; i++) {
            if (plants[i].currentYield >= 1) {
                plants[i].currentYield--;
                plants[i].maxedOut = false;
                picked++;
                break;
        }  //End If
    } //End plants for loop
    } //End pickerRuns for loop

    return [...plants], picked;

} //End runPickerBots()

function runPicklerBots(resources, robots, stats) {
    let pickled = 0;
    let picklerRuns = (robots.picklerBots * robots.picklerSpeed > resources.cucumbers[resources.cucumbers.length-1])
    ? resources.cucumbers[resources.cucumbers.length-1]
    : robots.picklerBots * robots.picklerSpeed;
    if (picklerRuns > 0) {
    stats.picklerActive = true;
    stats.picklerDelta++;
    }
    
    for (let i = 0; i < picklerRuns; i++) {
        pickled++;
    } //End picklerRuns for loop
    return pickled;
} //End picklerBots();

function runPlanterBots(plants, resources, robots, plantSettings, stats) {
    let seeds = 0;
    let planterRuns = (robots.planterBots * robots.planterSpeed > resources.seeds[resources.seeds.length-1])
    ? resources.seeds[resources.seeds.length-1]
    : robots.planterBots * robots.planterSpeed;

    if (planterRuns > 0) {
    stats.planterActive = true;
    stats.planterDelta++;
    }
    

    for (let i = 0; i < planterRuns; i++) {
        const newPlant = new Plants(plantSettings.modifier, plantSettings.growthRate, plantSettings.growthModifer, plantSettings.maxYield, plantSettings.deathChance, plantSettings.aging, plantSettings.maxAge, plantSettings.seedChance);
        plants.push(newPlant);
        seeds--;
    }
    return [...plants], seeds;
}

function cycleLog(log) {
    if (log.length > 25) {
        log = log.splice(0, -25);
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
    const buildings = state.buildings;
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
    let seeds = runPlanterBots(plants, resources, robots, plantSettings, stats);
    let recurringCost = getRecurringCost(buildings);
    let newLog = cycleLog(log);

    stats.totalProduction += pickled;

    //Cycle through function for buildings if they are active and purchased
    buildings.forEach((item) => {
        if (item.active && item.purchased) {
            runBuilding(item);
        }
    })

    updateStats(buildings, plants, stats);

    

    if (state.deltas.buttonDelta >= 5) {
        checkButtons();
        checkTabs(stats.totalProduction, state.locationMenu);
        checkUpgrades(stats.totalProduction, state.upgrades);
        checkBuildings(stats.totalProduction, state.buildings);
        store.dispatch({ type: 'deltas/resetDelta', payload: 'resetButtonDelta' });
    }

    store.dispatch({ type: 'plants/setAllPlants', payload: plants })
    store.dispatch({ type: 'stats/setAllStats', payload: stats });
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: picked - pickled}});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: (pickled - recurringCost) }});
    store.dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: seeds + newSeeds }});
    store.dispatch({ type: 'log/setAllLog', payload: newLog });
    store.dispatch({ type: 'deltas/cycleDeltas' });
} //End initial if statement

if (state.deltas.autoSaveDelta >= stats.autoSaveInterval) {
    store.dispatch({ type: 'SAVE_GAME' });
    store.dispatch({ type: 'deltas/resetDelta', payload: 'resetAutoSaveDelta'});
}

}//End updateTicker()