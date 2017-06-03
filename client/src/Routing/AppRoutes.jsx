import React from 'react';
import { BrowserRouter, Route, Switch, hashHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import store from '../../redux/configureStore';
import Profile from '../containers/Profile';
import Explore from '../components/Explore';
import Welcome from '../containers/Welcome';
import Chats from '../containers/Chats';

import '../styles/styles.scss';

const AppRoutes = () => (
  <Provider store={store}>
    <div>
      <Chats />
      <BrowserRouter history={hashHistory} >
        <Switch>
          <PrivateRoute exact path="/profile/:username" component={Profile} />
          <PrivateRoute exact path="/explore" component={Explore} />
          <Route exact path="/" component={Welcome} />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
);
export default AppRoutes;
