import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ path, isAuthenticated }) => (
  <Route
    path={path}
    render={compProps => (
    isAuthenticated ? (<this.props.component {...compProps} />) : (
      <Redirect to={{
        pathname: '/login',
      }}
      />
    ))}
  />
);

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.string,
};

PrivateRoute.defaultProps = {
  isAuthenticated: PropTypes.string,
};

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(PrivateRoute);
