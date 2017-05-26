import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  hashHistory
} from 'react-router-dom';
import Search from './components/Search';
import Login from './components/LoginComponent';
import './styles/styles.scss';

const AppRoutes = () => (
  <Router history={hashHistory}>
    <div>
      <Route exact path="/" component={Login}/>
      <Route path="/search" component={Search} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);
export default AppRoutes;
