import React from 'react';

const LoginComponent = () => {
  return (
    <div>
      <button href="https://github.com/login/oauth/authorize?client_id=...&scope=user,public_repo&redirect_uri=http://www.example.com/oauth_redirect">GITHUB LOGIN</button>
    </div>
  );
};

export default LoginComponent;
