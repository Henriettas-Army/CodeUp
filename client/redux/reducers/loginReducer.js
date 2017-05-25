/* global localStorage */

import { LOGIN_USER } from '../actions/loginActions';

const auth = (state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token'),
}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: true,
      });
    default:
      return state;
  }
};

export default auth;
