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
import PrivateRoute from './PrivateRoute';
import codeUpApp from '../../redux/reducers/combineReducers';
import Login from '../components/LoginComponent';
import Profile from '../containers/Profile';
import Explore from '../containers/Explore';
import Welcome from '../containers/Welcome';
import '../styles/styles.scss';

const store = createStore(codeUpApp, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const AppRoutes = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <div>
        <Route exact path="/login" component={Login} />
        {/* change root path to welcome page/waiting page */}
        <Route exact path="/" component={Welcome} />
        <PrivateRoute path="/profile/:username" component={Profile} />
        <PrivateRoute path="/explore" component={Explore} />
      </div>
    </Router>
  </Provider>
);
export default AppRoutes;
