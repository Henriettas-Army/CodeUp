/* global window */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub';
import { loginUser } from '../../redux/actions/loginActions';

const GITHUB_API = require('../../../server/config/github');

const CLIENT_ID = GITHUB_API.CLIENT_ID;

const style = {
  fontSize: '120px',
};

class LoginComponent extends Component {

  componentWillMount() {
    if (window.location.search) {
      const code = window.location.search.split('=')[1];
      axios.post('/api/users/login', { code })
      .then((token) => {
        window.localStorage.setItem('token', token.data);
        this.props.loginUser();
      });
    }
  }

  render() {
    return (
      <div className="welcome" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ fontSize: '80px' }}>Welcome to</p><br />
        <p style={style}>codeUp</p><br />
        <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user,repo`}>
          <SocialGithubIcon
            size={'xlarge'}
          /><br />
          Sign in with GitHub
        </a>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  status: state.auth.status,
});

const mapDispatchToProps = dispatch => ({
  loginUser: () => {
    dispatch(loginUser(jwtDecode(window.localStorage.getItem('token')), 'Available'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
