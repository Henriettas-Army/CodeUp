import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={compProps => (
      isAuthenticated ? (<Component {...compProps} />) : (
        <Redirect to={{
          pathname: '/login'
        }}
        />
      )
      )}
  />
);

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.string,
  component: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
  isAuthenticated: '',
};

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(PrivateRoute);
