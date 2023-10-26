import { runKiosk } from "./buildings/roadSidekiosk";
import { runBotHouse } from "./buildings/botHouse";
import { runPicklerBotStation } from "./buildings/picklerBotStation";

export function getRecurringCost(buildings) {
    let picklesUsed = 0;
    let activeCost = 0;
    
    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].active && buildings[i].purchased) {
        picklesUsed += buildings[i].recurringCost;
        }
    }
    return picklesUsed;
}

export function runBuilding(building) {
    switch(building.name) {
        case "Farmer's Roadside Kiosk": runKiosk(building); break;
        case "Picker Bot House": runBotHouse(building); break;
        case "Pickler Bot Station": runPicklerBotStation(building); break;
    }

}
