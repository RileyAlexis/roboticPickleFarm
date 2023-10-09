import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { takeEvery, put, all} from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';


//Slices
import resourcesSlice from './reducers/resourcesSlice';
import robotsSlice from './reducers/robotsSlice';
import plantSlice from './reducers/plantSlice';
import logSlice from './reducers/logSlice';
import robotsMenuSlice from './reducers/robotsMenuSlice';
import locationMenuSlice from './reducers/locationMenuSlice';
import farmMenuSlice from './reducers/farmMenuSlice';
import pricesSlice from './reducers/pricesSlice';
import plantSettingsSlice from './reducers/plantSettings';
import statsSlice from './reducers/statsSlice';


const sagaMiddleware = createSagaMiddleware();


const userId = (state = '', action) => {
    if (action.type === 'SET_USERID') {
      return action.payload;
    }
    return state;
  }
  
  const userEmail = (state = '', action) => {
    if (action.type === 'SET_EMAIL') {
      return action.payload;
    }
    return state;
  }
  
  const gameId = (state = '', action) => {
    if (action.type === 'SET_GAMEID') {
      return action.payload;
    }
    return state;
  }
  
  const authorized = (state = false, action) => {
    if (action.type === 'SET_AUTH') {
      return action.payload;
    }
    return state;
  }

const runEngine = (state = false, action) => {
  if (action.type === 'RUN_ENGINE') {
    return true;
  }
  return state;
}

  // sagaMiddleware.run(rootSaga);

  const rootReducer = combineReducers({
    resources: resourcesSlice,
    stats: statsSlice,
    robots: robotsSlice,
    plants: plantSlice,
    log: logSlice,
    authorized: authorized,
    userId: userId,
    userEmail: userEmail,
    farmMenu: farmMenuSlice,
    locationMenu: locationMenuSlice,
    robotMenu: robotsMenuSlice,
    prices: pricesSlice,
    plantSettings: plantSettingsSlice,
    runEngine: runEngine
});

  const storeInstance = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
      { thunk: false, serializableCheck: false })
      .concat(sagaMiddleware, 
        // logger
        ),
  })

  export { storeInstance };