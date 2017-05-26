import jwtDecode from 'jwt-decode';

const LOGIN_USER = 'LOGIN_USER';

const loginUser = (isAuthenticated, status) => ({
  type: LOGIN_USER,
  isAuthenticated,
  status,
});

module.exports = {
  LOGIN_USER,
  loginUser,
};
