const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

const loginUser = (isAuthenticated, status) => ({
  type: LOGIN_USER,
  isAuthenticated,
  status,
});

const logoutUser = (isAuthenticated, status) => ({
  type: LOGOUT_USER,
  isAuthenticated,
  status,
});

module.exports = {
  LOGIN_USER,
  LOGOUT_USER,
  loginUser,
  logoutUser,
};
