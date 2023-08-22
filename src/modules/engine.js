const engine = {
    cycle: 0,
    firstRun: 0,
    gameSpeed: 1000,
    randomEvent: 1,
    resources: {
        seeds: 5,
        cucumbers: 0,
        pickles: 0,
        pickleJars: 0
    },
    log: [],
    plants: [],
    ripeCucumbers: 0,
    currentGrowthRate: 0,
    mainBoxMenu: [
        {id: 'Plant Seeds', coolDown: 4000, dis: false, active: true},
        {id: 'Pick Cucumbers', coolDown: 2000, dis: false, active: true},
    ],




    updatePlants() {
        this.ripeCucumbers = 0;
        this.currentGrowthRate = 0;
        engine.plants.forEach((obj) => {
            obj.update()
            engine.resources.seeds += obj.seeds;
            obj.seeds = 0;
            this.ripeCucumbers += obj.ripeCucumbers;
            this.currentGrowthRate += obj.currentGrowthRate;
            if (obj.log !== '') { engine.gameLog(obj.log); obj.log = ''; }
        });
        engine.plants = engine.plants.filter((obj) => obj.dead === false);

        engine.cycle++;
    },
    gameLog(logText) {
        engine.log.push(engine.cycle + ' ' + logText);
        engine.log = engine.log.slice(-10);
        engine.cycle++;
    },
    plantSeed() {
        engine.mainBoxMenu[0].dis = true;
        setTimeout(() => engine.mainBoxMenu[0].dis = false, engine.mainBoxMenu[0].coolDown);
        if (engine.resources.seeds >= 1) {
            engine.plants.push(new Plants());
            engine.resources.seeds--;
            engine.gameLog('New Seedling Planted');
        }
        else if (engine.resources.seeds <= 0) {
            engine.gameLog("You don't have any seeds!");
        }
        engine.cycle++;
    },
    pickCucumbers() {
        engine.mainBoxMenu[1].dis = true;
        setTimeout(() => engine.mainBoxMenu[1].dis = false, engine.mainBoxMenu[1].coolDown);
        engine.plants.forEach((obj) => {
            if (obj.ripeCucumbers >= 1) { obj.ripeCucumbers--; engine.resources.cucumbers++ };

        })
    },
    buySeeds() {
        if (engine.resources.cucumbers >= 50) {
            engine.resources.seeds += 5;
            engine.resources.cucumbers -= 50;
            engine.gameLog('Five seeds purchased for 50 cucumbers')
        }
        else if (engine.resources.cucumbers <= 50) {
            engine.gameLog('Not enough cumcumbers');
        }
        engine.cycle++;
    }

}


const prices = {
    seeds: [5, 50],
    pickerBot: [1, 50],
    planterBox: [1, 50],
}


class Plants {
    constructor() {
        this.survival = 50;
        this.madeIt = Math.random() * 100;
        this.baseGrowthRate = 0.505;
        this.currentGrowthRate = 0;
        this.maturity = 0; //cycles
        this.maxYield = 5;
        this.currentYield = 0;
        this.ripeCucumbers = 0;
        this.ripeCycles = 0;
        this.age = 0;
        this.maxAge = 270; //cycles
        this.seedYield = 0.1;
        this.seeds = 0;
        this.dead = false;
        this.timeToPlant = 10000;
        this.log = '';
    }
    update() {
        this.maturity++;
        if (this.currentYield < this.maxYield && this.ripeCucumbers < this.maxYield) {
            this.currentYield += this.baseGrowthRate;
            this.currentGrowthRate = this.baseGrowthRate;
        }
        else if (this.ripeCucumbers >= this.maxYield) {
            if (this.ripeCycles >= 5) {
                this.ripeCucumbers = 0;
                this.ripeCycles = 0;
                this.log = 'Cucumbers are rotting on the vine!';
            }
            else {
                this.ripeCucumbers = this.maxYield;
                this.currentYield = 0;
                this.currentGrowthRate = 0;
                this.ripeCycles++;
            }
        };
        if (Math.floor(this.currentYield) > 0) { this.ripeCucumbers++; this.currentYield-- }
        let isSeed = Math.floor(Math.random() * 100);
        if (isSeed <= this.seedYield) { this.seeds++; this.log = 'A seed was produced!'; }
        if (this.maturity >= this.maxAge) { this.dead = true; this.log = 'A plant was retired' };
    }
}




module.exports = engine;