import jwtDecode from 'jwt-decode';
import { LOGIN_USER } from '../actions/loginActions';

const auth = (state = {
  status: 'Unavailable',
  isAuthenticated: false,
}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: jwtDecode(window.localStorage.getItem('token')),
        status: 'Available',
      });
    default:
      return state;
  }
};

export default auth;
