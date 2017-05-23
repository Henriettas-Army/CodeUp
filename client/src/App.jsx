import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
  isAuthenticated: PropTypes.isRequired,
  errorMessage: PropTypes.string,
};

App.defaultProps = {
  errorMessage: PropTypes.string,
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
