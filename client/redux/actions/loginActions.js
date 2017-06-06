/* global window */
import axios from 'axios';
import jwt from 'jsonwebtoken';

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const LOAD_LOGIN = 'LOAD_LOGIN';
const LOGIN_REMINDER = 'LOGIN_REMINDER';

const loginUser = (isAuthenticated, status) => ({
  type: LOGIN_USER,
  isAuthenticated,
  status,
});

const logoutUser = (isAuthenticated, status, reminder) => ({
  type: LOGOUT_USER,
  isAuthenticated,
  status,
  reminder,
});

const loadLogin = () => ({
  type: LOAD_LOGIN,
});

const loginReminder = () => ({
  type: LOGIN_REMINDER,
});

const postLogin = code => (
  axios.post('/api/users/login', { code })
);

const saveToken = token => (
  window.localStorage.setItem('token', token.data)
);

function loginUserAsync(code) {
  return (dispatch) => {
    dispatch(loadLogin());
    return postLogin(code)
    .then((token) => {
      saveToken(token);
      const user = jwt.decode(token.data);
      dispatch(loginUser(user, 'READY'));
      return { user, token };
    });
  };
}

module.exports = {
  LOGIN_USER,
  LOGOUT_USER,
  LOAD_LOGIN,
  LOGIN_REMINDER,
  loadLogin,
  saveToken,
  postLogin,
  loginUser,
  logoutUser,
  loginUserAsync,
  loginReminder,
};
