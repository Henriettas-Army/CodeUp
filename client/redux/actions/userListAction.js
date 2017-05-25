import axios from 'axios';

const LIST_USERS = 'LIST_USERS';
const LOADING = 'LOADING';
const listUsers = () => ({ type: LIST_USERS });
const loading = () => ({ type: LOADING });

const loadAllUsers = (dispatch) => {
  dispatch(listUsers());
  console.log('query results');
  axios.get('/api/allusers')
    .then((res) => {
      dispatch(listUsers(res.data.users));
    });
};
exports.module = {
  LIST_USERS,
  LOADING,

  listUsers,
  loading,
  loadAllUsers,
};
