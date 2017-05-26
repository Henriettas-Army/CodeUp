import axios from 'axios';

export const LIST_USERS = 'LIST_USERS';

const listUsers = users => ({ type: LIST_USERS, users });

const loadAllUsers = () => (
  function load(dispatch) {
    axios.get('/api/allusers/userlist')
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
