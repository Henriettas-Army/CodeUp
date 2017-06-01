/* global window */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub';
import Animate from 'grommet/components/Animate';
import Section from 'grommet/components/Section';
import { loginUser } from '../../redux/actions/loginActions';
import PreviewCarousel from './PreviewCarousel';

const GITHUB_API = require('../../../server/config/github');

const CLIENT_ID = GITHUB_API.CLIENT_ID;

const style = {
  fontSize: '120px',
};

const LoginComponent = () => (
  <Animate
    enter={{ animation: 'fade', duration: 5000, delay: 0 }}
    keep
  >
    <div className="welcome" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <p style={{ fontSize: '80px' }}>Welcome to</p><br />
      <p style={style}>codeUp</p><br />
      <p style={{ textAlign: 'center' }}>
        Find a partner to code with, attend events, and get involved with the coding community
      </p>
      <Section size="large">
        <PreviewCarousel />
      </Section>
      <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user,repo`}>
        <SocialGithubIcon
          size={'xlarge'}
        /><br />
        Sign in with GitHub
      </a>
    </div>
  </Animate>
);

LoginComponent.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string,
  status: PropTypes.string.isRequired,
};

LoginComponent.defaultProps = {
  isAuthenticated: PropTypes.string,
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
