import { takeEvery, put, all} from 'redux-saga/effects';

import saveGame from './savegame';
import startNewGame from './startNewGame';

function* rootSaga() { //also known as watcherSaga
  
    yield all ([
      takeEvery('SAVE_GAME', saveGame),
      takeEvery('START_NEW_GAME', startNewGame)
    ])
}

export default rootSaga;