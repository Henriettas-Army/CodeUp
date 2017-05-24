import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginComponent from './components/LoginComponent';

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <LoginComponent
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
