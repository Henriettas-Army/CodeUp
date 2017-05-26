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
import codeUpApp from '../redux/reducers/combineReducers';
import Search from './components/Search';
import Login from './components/LoginComponent';
import App from './App';
import Profile from './containers/Profile';
import Explore from './components/Explore';
import './styles/styles.scss';

const store = createStore(codeUpApp, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const AppRoutes = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/explore" component={Explore} />
      </div>
    </Router>
  </Provider>
);
export default AppRoutes;
