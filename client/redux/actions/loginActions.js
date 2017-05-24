const LOGIN_USER = 'LOGIN_USER';

const loginUser = user => ({
  type: LOGIN_USER,
  isAuthenticated: true,
  id_token: user.id_token,
});

module.exports = {
  LOGIN_USER,
  loginUser,
};
