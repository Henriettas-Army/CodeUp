import React from 'react';
import CLIENT_ID from '../../../server/config/github';

const LoginComponent = () => {

  return (
    <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3034/oauth_redirect`}>
      Log In With GitHub
    </a>
  );
};

export default LoginComponent;
