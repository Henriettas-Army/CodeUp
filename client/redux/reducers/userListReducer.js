import { LIST_USERS } from '../actions/userListAction';

const firstUser = [{
  username: 'Fliko',
  language: 'HTML',
}];

const listUsers = (state = firstUser, action) => {
  console.log(action.type, action);
  switch (action.type) {
    case LIST_USERS:
      return [{ username: 'SadlynotFliko', language: 'CSS' }, { username: 'FlikoIamnot', language: 'brainFuck' }, { username: 'notFliko', language: 'JavaScript' }];
    default:
      return state;
  }
};

export default listUsers;
