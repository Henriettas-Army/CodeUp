import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';

import LoginComponent from './components/LoginComponent';
import Events from './containers/Events';
import Profile from './containers/Profile';

const App = ({ isAuthenticated, status }) => (
  <GrommetApp>
    <LoginComponent
      isAuthenticated={isAuthenticated}
      status={status}
    />
    <Profile />
    {/* <Events />
    <Split>
      <Box
        colorIndex={'neutral-1'}
        justify={'center'}
        align={'center'}
        pad={'medium'}
      >
        Left Side
      </Box>
      <Box
        colorIndex={'neutral-2'}
        justify={'center'}
        align={'center'}
        pad={'medium'}
      >
        Right Side
      </Box>
    </Split> */}
  </GrommetApp>
);

App.propTypes = {
  isAuthenticated: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  status: state.auth.status,
});

export default connect(
  mapStateToProps,
)(App);
