import React from 'react';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';
import Animate from 'grommet/components/Animate';
import LoginComponent from './LoginComponent';
import Events from './EventsList';
import Profile from '../containers/Profile';

const App = () => (
  <GrommetApp>
    <Animate
      enter={{ animation: 'fade', duration: 5000, delay: 0 }}
      keep
    >
      <LoginComponent />
    </Animate>
    <Events />
    <Profile />
  </GrommetApp>
);

export default connect()(App);
