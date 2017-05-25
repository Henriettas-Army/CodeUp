import React from 'react';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';
import Animate from 'grommet/components/Animate';

import LoginComponent from './components/LoginComponent';
import Events from './containers/Events';
import Profile from './containers/Profile';
import UserList from './containers/Users';

const App = () => (
  <GrommetApp>
    <Animate
      enter={{ animation: 'fade', duration: 5000, delay: 0 }}
      keep
    >
      <LoginComponent />
    </Animate>
    <Profile />
  </GrommetApp>
);

export default connect()(App);
