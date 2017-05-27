import React from 'react';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';
import Animate from 'grommet/components/Animate';
import LoginComponent from './LoginComponent';
import Nav from '../containers/Nav';
import Profile from '../containers/Profile';

const App = () => (
  <GrommetApp>
    <Animate
      enter={{ animation: 'fade', duration: 5000, delay: 0 }}
      keep
    >
      <LoginComponent />
    </Animate>
    <Nav />
    <Profile />
  </GrommetApp>
);

export default connect()(App);
