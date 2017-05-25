/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import codeUpApp from '../redux/reducers/combineReducers';
import App from './App';
import './styles/styles.scss';

const store = createStore(codeUpApp, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Router>
    <div>
      <Route
        exact
        path="/"
        render={() => (
          <Provider store={store}>
            <App />
          </Provider>
        )}
      />
      <Route path="/search" component={Search} />
      <Route path="/login" component={Login} />
    </div>
  </Router>,
  document.getElementById('app'),
);
