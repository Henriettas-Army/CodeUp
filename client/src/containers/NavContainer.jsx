import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import loginActions from '../../redux/actions/loginActions';

const NavContainer = ({ logoutUser, isAuthenticated }) => (
  <Nav logoutUser={logoutUser} isAuthenticated={isAuthenticated} />
);

NavContainer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(loginActions.logoutUser('', 'Unavailable'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavContainer);
