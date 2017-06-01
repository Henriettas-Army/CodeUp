/* global window */
import axios from 'axios';

export const LIST_USERS = 'LIST_USERS';
export const ERROR = 'ERROR';

const listUsers = users => ({ type: LIST_USERS, users });
const error = err => ({ type: ERROR, err });

const config = {
  headers: { Authorization: window.localStorage.getItem('token') }
};

const loadAllUsers = () => (
  function load(dispatch) {
    return axios.get('/api/users/list', config)
      .then((res) => {
        if (res.data.users) {
          dispatch(listUsers(res.data.users));
        } else {
          console.log(res.data);
          dispatch(error(res.data));
        }
      });
  }
);

export default {
  LIST_USERS,
  ERROR,
  error,
  listUsers,
  loadAllUsers,
};
