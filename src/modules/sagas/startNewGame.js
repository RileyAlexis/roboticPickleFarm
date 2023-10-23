import { put, select} from 'redux-saga/effects';
import axios from "axios";


function getAllCookieNames() {
    let cookie = document.cookie;
    let regex = /AuthToken=(.*)/; // This regex captures everything after "AuthToken="
    let match = cookie.match(regex);
    return match[1];
}

function* startNewGame() {
    const AuthToken = getAllCookieNames();
    const userId = yield ( select( state => state.userId));

    const dataObj = {
        userId: userId
    }
    try {
        yield axios.post('/game/deleteGame', { headers: { 'Authorization': AuthToken}, dataObj})
        yield put({ type: 'RESET_ENTIRE_STORE'});
    } catch (error) {
        console.log(error);
    }
}

export default startNewGame;