import { runKiosk } from "./buildings/roadSidekiosk";

export function getRecurringCost(buildings) {
    let picklesUsed = 0;
    
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
    }

}
