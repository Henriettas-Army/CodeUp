/* global document */
import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
} from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import codeUpApp from '../redux/reducers/combineReducers';
import Search from './components/Search';
import Login from './components/LoginComponent';
import './styles/styles.scss';

const store = createStore(codeUpApp, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <div>
        <Route exact path="/" component={Search}/>
        <Route path="/search" component={Search} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>

  , document.getElementById('app'));
