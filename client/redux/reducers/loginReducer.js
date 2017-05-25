/* global localStorage */

import { LOGIN_USER } from '../actions/loginActions';

const auth = (state = {
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  status: 'Unavailable',
}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: true,
        status: 'Available',
      });
    default:
      return state;
  }
};

export default auth;
