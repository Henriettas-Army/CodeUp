// /* global window */
import jwtDecode from 'jwt-decode';
import { LOGIN_USER, LOGOUT_USER } from '../actions/loginActions';

const auth = (state = {
  status:  window.localStorage.token ? 'Available' : 'Unavailable',
  isAuthenticated: window.localStorage.token ? jwtDecode(window.localStorage.getItem('token')) : '',
}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        status: action.status,
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        status: action.status,
      });
    default:
      return state;
  }
};

export default auth;
