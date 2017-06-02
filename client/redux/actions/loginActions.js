/* global window */
import axios from 'axios';
import jwt from 'jsonwebtoken';

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const LOAD_LOGIN = 'LOAD_LOGIN';

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

const loadLogin = () => ({
  type: LOAD_LOGIN,
});

const postLogin = code => (
  axios.post('/api/users/login', { code })
);

const saveToken = token => (
  window.localStorage.setItem('token', token.data)
);

const loginUserAsync = code => (
  function loadAsync(dispatch) {
    dispatch(loadLogin());
    return postLogin(code)
    .then((token) => {
      saveToken(token);
      const user = jwt.decode(token.data);
      dispatch(loginUser(user, 'READY'));
    });
  }
);

module.exports = {
  LOGIN_USER,
  LOGOUT_USER,
  LOAD_LOGIN,
  loginUser,
  logoutUser,
  loginUserAsync
};
