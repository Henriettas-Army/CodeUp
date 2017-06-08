import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import loginActions from '../../redux/actions/loginActions';

const NavContainer = ({ logoutUser, isAuthenticated, match }) => (
  <Nav logoutUser={logoutUser} isAuthenticated={isAuthenticated} path={match.path} />
);

NavContainer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
};

NavContainer.defaultProps = {
  match: {},
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(loginActions.logoutUser('', '', false));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavContainer);
