import { LIST_USERS } from '../actions/userListAction';

const firstUser = {
  users: [
    {
      username: 'Fliko',
      skills: ['HTML'],
      desired: ['brains'],
      location: ['Austin', 'Tx'],
      status: 'available',
    },
  ],
};

const listUsers = (state = firstUser, action) => {
  switch (action.type) {
    case LIST_USERS:
      return Object.assign({}, state, { users: action.users });
    default:
      return state;
  }
};

export default listUsers;
