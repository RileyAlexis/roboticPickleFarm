import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
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
import { buttonCallInit } from './engine';

const sagaMiddleware = createSagaMiddleware();

const buttonCall = (state = buttonCallInit, action) => {
  return state;
}

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

  const gameSpeed = (state = 1000, action) => {
    return state;
  }
  
  const cycles = (state = 0, action) => {
    if (action.type === 'UPDATE_CYCLE') {
      return state++;
    }
    return state;
  }

  const upgrades = (state = {}, action) => {
    return state;
  }

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
    buttonCall: buttonCall,
    gameSpeed: gameSpeed,
});

  const storeInstance = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware, logger),
  })

  export default storeInstance;