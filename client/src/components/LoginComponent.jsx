import React from 'react';

const GITHUB_API = require('../../../server/config/github');

const CLIENT_ID = GITHUB_API.CLIENT_ID;

const LoginComponent = () => {

  return (
    <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scopes=user,repo`}>
      Log In With GitHub
    </a>
  );
};

export default LoginComponent;
