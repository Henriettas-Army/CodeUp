/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
// import api from 'redux-api-middleware';
import codeUpApp from '../redux/reducers/combineReducers';
import App from './App';

const store = createStore(codeUpApp, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
