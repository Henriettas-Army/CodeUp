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
import App from './components/App';
import Events from './containers/Events';
import Profile from './containers/Profile';
import './styles/styles.scss';

const store = createStore(codeUpApp, applyMiddleware(thunkMiddleware));

const AppRoutes = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/events" component={Events} />
      </div>
    </Router>
  </Provider>
);
export default AppRoutes;
