import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

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
  
  const authorized = (state = null, action) => {
    if (action.type === 'SET_AUTH') {
      return action.payload;
    }
    return state;
  }
  
  
  const cycles = (state = 0, action) => {
    if (action.type === 'UPDATE_CYCLE') {
      return state++;
    }
    return state;
  }
  
  const resources = (state = {}, action) => {
  
    switch (action.type) {
      case 'addResources.seeds': return state.seeds += action.payload;
      case 'addResources.cucumbers': return state.cucumbers += action.payload;
      case 'addResources.pickles': return state.pickles += action.payload;
      case 'addResources.pickleJars': return state.pickleJars += action.payload;
      default: return state;
      }
    return state;
  }
  
  
  const prices = (state = {}, action) => {
    return state;
  }
  
  const log = (state = [], action) => {
    if (action.type === 'ADD_LOG') {
      return [...state, action.payload];
    }
    return state;
  }
  
  const plants = (state = 0, action) => {
    if (action.type === 'ADD_PLANT') {
      return state += action.payload;
    }
    return state;
  }
  
  const pickerBots = (state = {}, action) => {
    if (action.type === 'SET_PICKERBOTS') {
      return action.payload;
    }
    return state;
  }
  
  const planterBots = (state = {}, action) => {
    if (action.type === 'SET_PLANTERBOTS') {
      return action.payload;
    }
    return state;
  }
  
  const picklerBots = (state = {}, action) => {
    if (action.type === 'SET_PICKLERBOTS') {
      return action.payload;
    }
    return state;
  }
  
  const upgrades = (state = {}, action) => {
    return state;
  }
  
  const storeInstance = createStore(
    // reducers,{
    combineReducers({
      userId,
      userEmail,
      authorized,
      gameId,
      cycles,
      resources,
      prices,
      log,
      plants,
      pickerBots,
      planterBots,
      picklerBots,
      upgrades
    }),
    applyMiddleware(thunk, logger)
  );

  export default storeInstance;