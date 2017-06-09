import React from 'react';
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub';
import Animate from 'grommet/components/Animate';
import Section from 'grommet/components/Section';
import PreviewCarousel from './PreviewCarousel';

const GITHUB_API = require('../../../server/config/github');

const CLIENT_ID = GITHUB_API.CLIENT_ID;

const style = {
  fontSize: '15vh',
};

const Login = () => (
  <Animate
    enter={{ animation: 'fade', duration: 5000, delay: 0 }}
    keep
  >
    <div className="welcome" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 0 }}>
      <p style={style}>codeUp</p>
      <p style={{ textAlign: 'center' }}>
        Find a partner to code with, attend events, and get involved with the coding community
      </p>
      <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`} style={{ textAlign: 'center' }}>
        <SocialGithubIcon
          size={'large'}
        /><br />
        <span>Sign in with GitHub</span>
      </a>
      <Section size="large">
        <PreviewCarousel />
      </Section>
    </div>
  </Animate>
);

export default Login;
