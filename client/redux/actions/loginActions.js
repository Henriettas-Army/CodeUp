import jwtDecode from 'jwt-decode';

const LOGIN_USER = 'LOGIN_USER';

const loginUser = () => ({
  type: LOGIN_USER,
  isAuthenticated: jwtDecode(window.localStorage.getItem('token')),
  status: 'Available',
});

module.exports = {
  LOGIN_USER,
  loginUser,
};
