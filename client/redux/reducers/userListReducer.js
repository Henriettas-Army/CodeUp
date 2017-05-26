import { LIST_USERS } from '../actions/userListAction';

const firstUser = [{
  username: 'Fliko',
  skills: ['HTML'],
  desired: ['brains'],
  location: ['Austin', 'Tx'],
  status: 'available',
}];

const listUsers = (state = firstUser, action) => {
  console.log(action.type, action);
  switch (action.type) {
    case LIST_USERS:
      console.log('----------------', action);
      return { users: action.users };
    default:
      return state;
  }
};

export default listUsers;
