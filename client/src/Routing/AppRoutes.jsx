import React from 'react';
import { BrowserRouter, Route, Switch, hashHistory } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import codeUpApp from '../../redux/reducers/combineReducers';
import PrivateRoute from './PrivateRoute';
import Profile from '../containers/Profile';
import Explore from '../components/Explore';
import Welcome from '../containers/Welcome';
import '../styles/styles.scss';

const store = createStore(
  codeUpApp,
  undefined,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

const AppRoutes = () => (
  <Provider store={store}>
    <BrowserRouter history={hashHistory} >
      <Switch>
        <PrivateRoute exact path="/profile/:username" component={Profile} />
        <PrivateRoute exact path="/explore" component={Explore} />
        <Route exact path="/" component={Welcome} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
export default AppRoutes;
