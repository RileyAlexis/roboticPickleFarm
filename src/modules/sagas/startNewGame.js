import { put, select } from 'redux-saga/effects';
import axios from "axios";

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

function* startNewGame() {
    const AuthToken = getAllCookieNames();
    const userId = yield (select(state => state.userId));

    const dataObj = {
        userId: userId
    }
    try {
        yield axios.post('/game/deleteGame', { headers: { 'Authorization': AuthToken }, dataObj })
        yield put({ type: 'RESET_ENTIRE_STORE' });
    } catch (error) {
        console.log(error);
    }
}

export default startNewGame;