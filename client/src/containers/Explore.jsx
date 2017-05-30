/* global window */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '../components/Tabs';
import NavContainer from '../containers/NavContainer';
import loginAction from '../../redux/actions/loginActions';

class Explore extends Component {
  componentWillMount() {
    if (window.location.search) {
      const code = window.location.search.split('=')[1];
      axios.post('/api/users/login', { code })
      .then((token) => {
        window.localStorage.setItem('token', token.data);
        this.props.loginUser();
      }).then(() => {
        window.location.href = `/${this.props.isAuthenticated}`;
      });
    }
  }
  render() {
    return (
      <div>
        <NavContainer />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Tabs />
      </div>
    );
  }
}

Explore.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string,
};

Explore.defaultProps = {
  isAuthenticated: '',
};

const mapStateToProps = state => (
  ({
    isAuthenticated: state.auth.isAuthenticated,
  })
);

const mapDispatchToProps = dispatch => ({
  loginUser: (username, status) => {
    dispatch(loginAction.loginUser(username, status));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Explore);