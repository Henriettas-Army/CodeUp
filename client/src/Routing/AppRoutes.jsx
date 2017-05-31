import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  hashHistory
} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import requireAuth from './routeAuth';
import codeUpApp from '../../redux/reducers/combineReducers';
import Profile from '../containers/Profile';
import Explore from '../components/Explore';
import Welcome from '../containers/Welcome';
import '../styles/styles.scss';

const store = createStore(codeUpApp, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const AppRoutes = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <div>
        <Route exact path="/" component={Welcome} />
        <Route path="/profile/:username" component={Profile} onEnter={requireAuth} />
        <Route exact path="/explore" component={Explore} onEnter={requireAuth} />
      </div>
    </Router>
  </Provider>
);
export default AppRoutes;
