import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  hashHistory
} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import codeUpApp from '../redux/reducers/combineReducers';
import Search from './components/Search';
import Login from './components/LoginComponent';
import './styles/styles.scss';
import App from './App';

const store = createStore(codeUpApp, applyMiddleware(thunkMiddleware));

const AppRoutes = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>
);
export default AppRoutes;
