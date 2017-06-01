/* global window */
// import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { LOGIN_USER, LOGOUT_USER, LOAD_LOGIN } from '../actions/loginActions';

const INITIAL_STATE = {
  status: window.localStorage.token ? 'READY' : '',
  isAuthenticated: window.localStorage.token ? jwt.decode(window.localStorage.getItem('token')) : '',
  rehydrated: false,
};

const auth = (state = INITIAL_STATE, action) => {
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
    case 'persist/REHYDRATE':
      return { ...state, persistedState: action.payload, rehydrated: true };
    default:
      return state;
  }
};

export default auth;
