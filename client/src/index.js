/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, Route, browserHistory } from 'react-router';
// import api from 'redux-api-middleware';
import codeUpApp from '../redux/reducers/combineReducers';
import App from './App';
import './styles/styles.scss';

const store = createStore(
  codeUpApp, /* preloadedState, */
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <Router history={browserHistory} >
      <Route path="/" component={App} />
    </Router> */}
  </Provider>,
  document.getElementById('app'),
);
