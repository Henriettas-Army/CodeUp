import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

const PrivateRoute = props => (
  <Route
    path={props.path}
    render={compProps => (
    Auth.isAuthenticated ? (<props.component {...compProps} />) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}
      />
    )
  )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.isRequired,
};

PrivateRoute.propTypes = {
  path: PropTypes.isRequired,
};

PrivateRoute.propTypes = {
  location: PropTypes.isRequired,
};


export default PrivateRoute;
