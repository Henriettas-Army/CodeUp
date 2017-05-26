import axios from 'axios';

const LIST_USERS = 'LIST_USERS';

const listUsers = users => ({ type: LIST_USERS, users });

const loadAllUsers = (dispatch) => {
  axios.get('/api/allusers')
    .then((res) => {
      dispatch(listUsers(res.data.users));
    });
};

exports.module = {
  LIST_USERS,

  listUsers,
  loadAllUsers,
};
