import { combineReducers, configureStore, getDefaultMiddleware, applyMiddleware } from '@reduxjs/toolkit';
import { takeEvery, put, all } from 'redux-saga/effects';
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
import statsSlice from './reducers/statsSlice';
import deltaSlice from './reducers/deltas';
import upgradesSlice from './reducers/upgradesSlice';
import buildingsSlice from './reducers/buildingsSlice';

//Saga
import rootSaga from './sagas/rootSaga';

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

const authorized = (state = false, action) => {
  if (action.type === 'SET_AUTH') {
    return action.payload;
  }
  return state;
}

const runEngine = (state = false, action) => {
  if (action.type === 'RUN_ENGINE') {
    return true;
  } else if (action.type === 'STOP_ENGINE') {
    return false;
  }
  return state;
}

const eventCondition = (state = false, action) => {
  if (action.type === 'SET_RAIN') {
    return true;
  } else return false;
  }


//Wrapping the allReducers in a root reducer allows the entire store 
//to be reset to initialstate without adding a reducer to every slice
const rootReducer = (state, action) => {
  if (action.type === 'RESET_ENTIRE_STORE') {
    state = undefined;
  }
  return allReducers(state, action);
}

const allReducers = combineReducers({
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
  deltas: deltaSlice,
  upgrades: upgradesSlice,
  buildings: buildingsSlice,
  runEngine: runEngine,
  eventCondition: eventCondition,
});

const storeInstance = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    { thunk: false, serializableCheck: false })
    .concat(sagaMiddleware,
      // logger
    ),
})

sagaMiddleware.run(rootSaga);

export { storeInstance };