import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../redux/actions/loginActions';
import Login from './components/Login';


class App extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <div>
        <Login
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.func,
};

App.defaultProps = {
  errorMessage: PropTypes.func,
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps)(App);
