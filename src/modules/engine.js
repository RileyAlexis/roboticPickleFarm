import { storeInstance as store } from './store';
import { deepUnfreeze } from './deepUnfreeze';
import { checkButtons, checkTabs, checkUpgrades, checkBuildings, checkBotsMenu } from './events';
import { getRecurringCost, runBuilding } from './cycleBuildings';

function growPlants(plants) {
    plants.currentYield.value += (plants.plantCount.value * plants.growthRate) * plants.growthRateModifier;
}

function generateSeeds(plants) {
    let newSeeds = 0;
    for (let i = 0; i < plants.plantCount.value; i++) {
        const seed = Math.random();
        if (plants.seedChance >= seed) {
            newSeeds += 1;
        }
    }
    return newSeeds;
}
//After plant and robot data has been calculated calculate the updated stats information
function updateStats(buildings, plants, stats) {
    let totalGrowthRate = 0;
    let averageAge = 0;
    let maxYield = 0;
    let newRipeCucumbers = 0;

    stats.totalMaxedOut = 0; //No longer used

    newRipeCucumbers += Math.floor(plants.currentYield.value);
    plants.currentYield.value -= newRipeCucumbers;
    totalGrowthRate = (plants.plantCount.value * plants.growthRate) * plants.growthRateModifier; //growthRateModifier is currently unused

    //Tracks costs of buldings for stats tooltip display
    stats.recurringCosts = [];
    buildings.forEach((item) => {
        if (item.active && item.purchased) {
            stats.recurringCosts.push({ building: item.name, cost: item.recurringCost + item.activeCost });
        }
    })

    //Reset visual cues for active bots
    if (stats.pickerDelta >= 3) { stats.pickerActive = false; stats.pickerDelta = 0 }
    if (stats.planterDelta >= 3) { stats.planterActive = false; stats.planterDelta = 0 }
    if (stats.picklerDelta >= 3) { stats.picklerActive = false; stats.picklerDelta = 0 }

    //Sets general stats data to be displayed on the DOM and used in the next ticker update
    stats.totalGrowthRate.value = totalGrowthRate;
    stats.maxYield.value = maxYield;
    stats.ripeCucumbers.value += newRipeCucumbers;
    stats.averageAge = parseFloat(averageAge.toFixed(2)); //No longer used
    stats.totalGrowthRate.value = parseFloat(totalGrowthRate.toFixed(2));
    stats.cycles += 1;
    return [stats];
}

//Calculates how many cucumbers the bots can pick this cycle
function runPickerBots(robots, stats) {
    let picked = 0;
    let pickerRuns = (robots.pickerBots.value * robots.pickerSpeed) >= stats.ripeCucumbers.value ?
        (picked = stats.ripeCucumbers.value)
        :
        (picked = (robots.pickerBots.value * robots.pickerSpeed))

    if (pickerRuns > 0) {
        stats.pickerActive = true;
        stats.pickerDelta++;
    }

    return picked;

} //End runPickerBots()

//Calculates how many pickles the bots can make this cycle
function runPicklerBots(resources, robots, stats) {
    let pickled = 0;
    let picklerRuns = (robots.picklerBots.value * robots.picklerSpeed > resources.cucumbers[resources.cucumbers.length - 1])
        ? resources.cucumbers[resources.cucumbers.length - 1]
        : robots.picklerBots.value * robots.picklerSpeed;
    if (picklerRuns > 0) {
        stats.picklerActive = true;
        stats.picklerDelta++;
    }
    pickled = picklerRuns;
    return pickled;
} //End picklerBots();

//Calculates how many seeds can be planted this cycle
function runPlanterBots(plants, resources, robots, stats) {
    let seeds = 0;
    let planterRuns = (robots.planterBots.value * robots.planterSpeed > resources.seeds[resources.seeds.length - 1])
        ? resources.seeds[resources.seeds.length - 1]
        : robots.planterBots.value * robots.planterSpeed;

    if (planterRuns > 0) {
        stats.planterActive = true;
        stats.planterDelta++;
    }

    plants.plantCount.value += planterRuns;
    seeds = -planterRuns;

    return seeds;
}

//Limits the game log to 35 items
function cycleLog(log) {
    if (log.length > 35) {
        log = log.splice(0, -35);
    }
    return log;
}

export function convertToMillion() {
 const state = store.getState();
 let stats = state.stats;
 let plants = state.plants;
 let robots = state.robots;
 
 stats.exponent = 'm';
 stats.totalProduction.value = stats.totalProduction.value / stats.million;
 
 plants.plantCount.value = plants.plantCount.value / stats.million;

 


}




//Primary Update Engine - Runs 1 per second on default(set by gameSpeed)
export function updateTicker() {
    const state = store.getState();
    //Copy state and unfreeze it so vars can be manipulated and then update the state at the end of the ticker process
    let plants = deepUnfreeze(state.plants);
    let stats = deepUnfreeze(state.stats);
    const robots = state.robots;
    const resources = state.resources;
    const buildings = state.buildings;
    const log = deepUnfreeze(state.log);


    //Engine stops here if there are no plants. 
    //Calls each function in turn to complete the game update cycle
    if (plants.plantCount.value > 0) {
        if (stats.ripeCucumbers.value < (plants.maxYield * plants.plantCount.value)) growPlants(plants);
        let newSeeds = generateSeeds(plants); //Returns # of new seeds(if any)
        let picked = runPickerBots(robots, stats); //Returns the # of ripe cucumbers picked by picker bots
        let pickled = runPicklerBots(resources, robots, stats); //returns the # of pickles made by pickler bots
        let seeds = runPlanterBots(plants, resources, robots, stats); //returns the # of seeds planted by planter bots
        let recurringCost = getRecurringCost(buildings); //Calculates the recurring cost of any active buildings
        let newLog = cycleLog(log); //Prevents the game log from getting too long

        stats.totalProduction.value += pickled;
        stats.ripeCucumbers.value -= picked;

        //Cycle through function for buildings if they are active and purchased
        buildings.forEach((item) => {
            if (item.active && item.purchased) {
                runBuilding(item);
            }
        })

        updateStats(buildings, plants, stats);

        //Every 5th cycle checks the totalProduction against the showAt property for each button, upgrade and building.
        //These functions control the timing of when each game option becomes available to the player
        if (state.deltas.buttonDelta >= 5) {
            checkButtons();
            checkTabs(stats.totalProduction.value, state.locationMenu);
            checkUpgrades(stats.totalProduction.value, state.upgrades);
            checkBuildings(stats.totalProduction.value, state.buildings);
            checkBotsMenu(stats.totalProduction.value, state.robotMenu);
            store.dispatch({ type: 'deltas/resetDelta', payload: 'resetButtonDelta' });
        }
        //Update ticker is complete - update state
        store.dispatch({ type: 'plants/setAllPlants', payload: plants })
        store.dispatch({ type: 'stats/setAllStats', payload: stats });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: picked - pickled } });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: (pickled - recurringCost) } });
        store.dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: seeds + newSeeds } });
        store.dispatch({ type: 'log/setAllLog', payload: newLog });
        store.dispatch({ type: 'deltas/cycleDeltas' });
    } //End initial if statement

    //Runs the auto save
    if (state.deltas.autoSaveDelta >= stats.autoSaveInterval) {
        store.dispatch({ type: 'SAVE_GAME' });
        store.dispatch({ type: 'deltas/resetDelta', payload: 'resetAutoSaveDelta' });
    }
}//End updateTicker()