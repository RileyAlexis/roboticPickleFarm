import { put, select } from 'redux-saga/effects';

import axios from 'axios';

function getAllCookieNames() {
    const userAgent = navigator.userAgent;
    let cookie = document.cookie;
    let regex = '';
    //Browsers parse the cookie string in a different order - Safari Regex: /AuthToken=([^;]+);/ Chrome & Firefox Regex: /AuthToken=(.*)/;
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        regex = /AuthToken=([^;]+);/
    } else if (userAgent.includes('Chrom') || userAgent.includes('Firefox')) { regex = /AuthToken=(.*)/; }

    let match = cookie.match(regex);
    return match[1];
}

function* saveGame() {
    const AuthToken = getAllCookieNames();
    const store = yield (select(state => state));

    const dataObj = {
        userId: store.userId,
        resources: store.resources,
        prices: store.prices,
        log: store.log,
        plants: store.plants,
        robots: store.robots,
        upgrades: store.upgrades,
        stats: store.stats,
        buildings: store.buildings,
    }
    try {
        yield axios.post('/game/savegame', { headers: { 'Authorization': `${AuthToken}` }, dataObj })
        yield put({ type: 'log/addLog', payload: { line: `Game Saved Successfully`, cycle: store.stats.cycles } });
    }
    catch (error) {
        console.error(error);
    }
}

export default saveGame;