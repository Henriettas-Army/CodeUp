import axios from 'axios';

export const LIST_USERS = 'LIST_USERS';
export const ERROR = 'ERROR';

const listUsers = users => ({ type: LIST_USERS, users });
const error = err => ({ type: ERROR, err });

const loadAllUsers = username => (
  function load(dispatch) {
    return axios.get('/api/users/list', {
      params: {
        username,
      },
    })
      .then((res) => {
        if (res.data.users) {
          dispatch(listUsers(res.data.users));
        } else {
          dispatch(error(res.data.error));
        }
      });
  }
);

export default {
  LIST_USERS,

  listUsers,
  loadAllUsers,
};
