import { put, select} from 'redux-saga/effects';

import axios from 'axios';

function getAllCookieNames() {
    let cookie = document.cookie;
    let regex = /AuthToken=(.*)/; // This regex captures everything after "AuthToken="
    let match = cookie.match(regex);
    return match[1];
}

function* saveGame() {
    const AuthToken = getAllCookieNames();
    const store = yield ( select( state => state));

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
        plantSettings: store.plantSettings
    }
 try {
    yield axios.post('/game/savegame', {headers: { 'Authorization': `${AuthToken}`}, dataObj})
    yield put({type: 'log/addLog', payload: {line: `Game Saved Successfully`, cycle: store.stats.cycles}});
 }
catch (error) {
    console.error(error);
}}

export default saveGame;