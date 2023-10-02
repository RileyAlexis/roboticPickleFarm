import store from './store';

class Plants {
    constructor(modifier, growthRate, growthModifer, maxYield, deathChance, aging, maxAge) {
    this.modifier = modifier;
    this.growthRate = growthRate;
    this.growthModifer = growthModifer;
    this.maxYield = maxYield;
    this.deathChance = deathChance;
    this.aging = aging;
    this.maxAge = maxAge;
    this.age = 0;
    this.currentYield = 0;
    this.dead = false;
    }
}

export function plantSeed() {
    const state = store.getState();
    store.dispatch({type: 'SET_GAMEID', payload: 600});

    console.log('Plant Seed', state);
}

export function pickCucumbers() {
    const state = store.getState();
    const cucumbers = store.resources.cucumbers;
    console.log('Pick Cucumbers', cucumbers);
}

export function makePickles() {
    const state = store.getState();
    const pickles = store.resources.pickles;
    console.log('Make Pickles', pickles);
}

export function buyBot(botType) {
    console.log(botType);
}
