import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';

//Material UI
import { ThemeProvider, styled } from '@mui/material/styles';
import { pickles } from './modules/themes';

//Redux Store
import storeInstance from './modules/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={storeInstance}>
    <ThemeProvider theme={pickles}>
    <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);


