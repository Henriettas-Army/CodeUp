/* global window */
import jwtDecode from 'jwt-decode';
import { LOGIN_USER } from '../actions/loginActions';

const auth = (state = {
  status: 'Unavailable',
  isAuthenticated: window.localStorage.getItem('token') ? jwtDecode(window.localStorage.getItem('token')) : '',
}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        status: action.status,
      });
    default:
      return state;
  }
};

export default auth;
