import axios from 'axios';

export const LIST_USERS = 'LIST_USERS';

const listUsers = users => ({ type: LIST_USERS, users });

const loadAllUsers = () => (
  function load(dispatch) {
    return axios.get('/api/users/list')
      .then((res) => {
        dispatch(listUsers(res.data));
      });
  }
);

export default {
  LIST_USERS,

  listUsers,
  loadAllUsers,
};
