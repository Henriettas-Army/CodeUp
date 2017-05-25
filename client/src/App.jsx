import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Box';

import LoginComponent from './components/LoginComponent';
import Events from './containers/Events';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <GrommetApp>
        <LoginComponent
          isAuthenticated={isAuthenticated}
        />
        <Events />
        <Split>
          <Box colorIndex={'neutral-1'}
            justify={'center'}
            align={'center'}
            pad={'medium'}
          >
            Left Side
          </Box>
          <Box colorIndex={'neutral-2'}
            justify={'center'}
            align={'center'}
            pad={'medium'}
          >
            Right Side
          </Box>
        </Split>
      </GrommetApp>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(
  mapStateToProps,
)(App);
