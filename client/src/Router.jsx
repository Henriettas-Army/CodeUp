import React from 'react';
import {
  StaticRouter,
  Route,
} from 'react-router-dom';
import Search from './components/Search';
import Login from './components/LoginComponent';
import App from './components/App';
import './styles/styles.scss';

const AppRoutes = () => (
  <StaticRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/search" component={Search} />
      <Route path="/login" component={Login} />
    </div>
  </StaticRouter>
);
export default AppRoutes;
