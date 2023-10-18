import { takeEvery, put, all} from 'redux-saga/effects';

import saveGame from './savegame';

function* rootSaga() { //also known as watcherSaga
  
    yield all ([
      takeEvery('SAVE_GAME', saveGame),
    ])
}

export default rootSaga;