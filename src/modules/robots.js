class Robots {
    constructor() {
        this.picks = 0.01;
        this.plants = 0.01;
        this.battery = 100;
        this.maxBattery = 100;
        this.powerUse = 5;
        this.chargeSpeed = 5;
        this.job = '';
        this.broken = false;
        this.dead = false;
    }
    update() {
        if (this.job !== 'charging') {
            this.battery -= this.powerUse;
        }
        else if (this.job === 'charging' && this.battery < this.maxBattery) {
            this.battery += this.chargeSpeed;
    }
        else if (this.battery === this.maxBattery) {
            this.job = '';
    }    
    }
    modifyBot(picks, battery, maxBattery, powerUse, chargeSpeed) {
        this.picks = picks;
        this.battery = battery;
        this.maxBattery = maxBattery;
        this.powerUse = powerUse;
        this.chargeSpeed = chargeSpeed;
    }
    setJob(job) {
        this.job = job;
    }

}



// class Fields {
//     constructor() {
//         this.acres = 0.1;
//         this.fertility = 1;
//         this.season = {
//             Winter: 0,
//             Spring: 1,
//             Summer: 2,
//             Fall: 1
//         }
//     }
// }

// class ChargingStation {
//     constructor() {
//         this.powerUse = 0.5;
//         this.chargingSpeed = 0.2;
//         this.chargingSpots = 1;
//     }
// }

// class ComponentBuilder {
//     constructor() {
//         this.powerUse = 1;
//         this.buildRate = 0.01;
//         this.storedComponents = 0;
//         this.maxStoredComponents = 10;
//         this.minPower = 0.1;
//         this.maxPower = 1;
//     }
// }

// class BotBuilder {
//     constructor() {
//         this.componentsPerBot = 100;
//         this.componentsPerSec = 0.2;
//         this.minPower = 0.1;
//         this.maxPower = 1
//     }
// }

// class SolarPanel {
//     constructor() {
//         this.powerProduction = 5;
//     }
// }

// class FusionPlant {
//     constructor() {
//         this.powerProduction = 100;
//     }
// }

// class Mine {
//     constructor() {
//         this.dirtProduction = 5;
//         this.rockProduction = 5;
//         this.metalProduction = 5;
//     }
// }

module.exports = Robots;