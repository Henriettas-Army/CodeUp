const LOGIN_USER = 'LOGIN_USER';

const loginUser = user => ({
  type: LOGIN_USER,
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
});

module.exports = {
  LOGIN_USER,
  loginUser,
};
