import React from 'react';
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub';
import Animate from 'grommet/components/Animate';
import Section from 'grommet/components/Section';
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

export default LoginComponent;
