import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest, path }) => (
  <Route
    exact
    path={path}
    {...rest}
    render={props => (
      isAuthenticated ? (<Component {...props} />) : (
        <Redirect to={{ pathname: '/' }} />)
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
