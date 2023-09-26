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
    prices: {
        seeds: [5, 50],
        pickerBot: [1, 100],
        planterBot: [1, 100],
        picklerBot: [1, 100]
    },
    log: [],
    plants: [],
    pickerBots: {
        qty: 0,
        speed: 1,
        cost: 50,
    },
    planterBots: {
        qty: 0,
        speed: 1,
        cost: 50,
    },
    picklerBots: {
        qty: 0,
        speed: 1,
        cost: 50
    },
    ripeCucumbers: 0,
    currentGrowthRate: 0,
    farmMenu: [
        {name: 'Plant', coolDown: 4000, dis: false, show: true},
        {name: 'Pick', coolDown: 2000, dis: false, show: true},
        {name: 'Buy Seeds', coolDown:2000, dis: false, show: false},
        {name: 'Pickle', coolDown: 5000, dis:false, show: true},
    ],
    robotMenu: [
        {id: 'buyPickerBot', title: 'Buy Planter Bot', dis:false, show: true},
        {id: 'butPlanterBot', title: 'Buy Picker Bot', dis:false, show: true},
        {id: 'buyPicklerBot', title: 'Buy Pickler Bot', dis:false, show:true}
    ],
    locationMenu: [
        {id: 'farm', title: 'Farm', show: true, activeTab: true},
        {id: 'robots', title: 'Robots', show: false, activeTab: false},
        {id: 'buildings', title: 'Buildings', show: false, activeTab: false},
        {id: 'powerUps', title: 'Power Ups', show:false, activeTab: false},
    ],
    buttonCall(name) {
        console.log(name);
        switch (name) {
            case 'Plant': engine.plantSeed(); break;
            case 'Pick': engine.pickCucumbers(); break;
            case 'Pickle': engine.makePickles(); break;
            case 'buyPickerBot': engine.buyPlanterBot(); break;
            case 'buyPickerBot': engine.buyPickerBot(); break;
            case 'buyPickerBot': engine.buyPicklerBot(); break;
        
        }
    },



    updatePlants() {
        this.ripeCucumbers = 0;
        this.currentGrowthRate = 0;
        engine.plants.forEach((obj) => {
            obj.update()
            this.resources.seeds += obj.seeds;
            obj.seeds = 0;
            this.ripeCucumbers += obj.ripeCucumbers;
            this.currentGrowthRate += obj.currentGrowthRate;
            if (obj.log !== '') { this.gameLog(obj.log); obj.log = ''; }
        });
        this.plants = this.plants.filter((obj) => obj.dead === false);

        this.cycle++;
    },
    makePickles() {
        if (this.resources.cucumbers >= 5) {
            this.farmMenu[2].dis = true;
            setTimeout(() => engine.farmMenu[2].dis = false, engine.farmMenu[2].coolDown);
            this.resources.cucumbers -= 5;
            this.resources.pickles += 5;
        }
        else if (this.resources.cucumbers < 5) {
            this.gameLog('Need at least 5 cucumbers to pickle');
        }
        },
    
    updateBots() {
       
    },
    buyPickerBot() {
       if (engine.resources.pickles >= engine.prices.pickerBot[1]) {
            engine.pickerBots.qty++;
            engine.resources.pickles -= engine.prices.pickerBot[1];
       }
       else if (engine.resources.pickles < engine.prices.pickerBot[1]) {
        engine.gameLog('Not enough Pickles!');
       }
    },
    buyPlanterBot() {
        if (engine.resources.pickles >= engine.prices.planterBot[1]) {
             engine.planterBots.qty++;
             engine.resources.pickles -= engine.prices.planterBot[1];
        }
        else if (engine.resources.pickles < engine.prices.planterBot[1]) {
         engine.gameLog('Not enough Pickles!');
        }
     },
     buyPicklerBot() {
        if (engine.resources.pickles >= engine.prices.picklerBot[1]) {
             engine.picklerBots.qty++;
             engine.resources.pickles -= engine.prices.picklerBot[1];
        }
        else if (engine.resources.pickles < engine.prices.picklerBot[1]) {
         engine.gameLog('Not enough Pickles!');
        }
     },
    gameLog(logText) {
        engine.log.push(engine.cycle + ' ' + logText);
        engine.log = engine.log.slice(-10);
        engine.cycle++;
    },
    plantSeed() {
        engine.farmMenu[0].dis = true;
        setTimeout(() => engine.farmMenu[0].dis = false, engine.farmMenu[0].coolDown);
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
        engine.farmMenu[1].dis = true;
        setTimeout(() => engine.farmMenu[1].dis = false, engine.farmMenu[1].coolDown);
        engine.plants.forEach((obj) => {
            if (obj.ripeCucumbers >= 1) { obj.ripeCucumbers--; engine.resources.cucumbers++ };

        })
    },
    buySeeds() {
        if (engine.resources.cucumbers >= prices.seeds[1]) {
            engine.resources.seeds += 5;
            engine.resources.cucumbers -= prices.seeds[1];
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
    pickerBot: [1, 100],
    planterBot: [1, 100],
    pickleBot: [1, 100]
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