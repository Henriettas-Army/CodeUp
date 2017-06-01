/* global window */
// import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { LOGIN_USER, LOGOUT_USER, LOAD_LOGIN } from '../actions/loginActions';

const auth = (state = {
  status: window.localStorage.token ? 'READY' : '',
  isAuthenticated: window.localStorage.token ? jwt.decode(window.localStorage.getItem('token')) : '',
}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        status: action.status,
      });
    case LOGOUT_USER:
      window.localStorage.removeItem('token');
      window.location.href = '/';
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        status: action.status,
      });
    case LOAD_LOGIN:
      return Object.assign({}, state, { status: 'LOADING' });
    default:
      return state;
  }
};

export default auth;
