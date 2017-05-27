import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    return (
      <Route
        path={this.props.path}
        render={compProps => (
        this.props.isAuthenticated ? (<this.props.component {...compProps} />) : (
          <Redirect to={{
            pathname: '/login',
          }}
          />
        )
      )}
      />
    );
  };
}
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.string,
};

PrivateRoute.defaultProps = {
  isAuthenticated: PropTypes.string,
};

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(PrivateRoute);
