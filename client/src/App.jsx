import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../redux/actions/loginActions';
import LoginContainer from './containers/LoginContainer';


class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <LoginContainer
          isAuthenticated={isAuthenticated}
        />
      </div>
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
