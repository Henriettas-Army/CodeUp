/* global processSpecial */
import { REHYDRATE } from 'redux-persist/constants';
import { LIST_USERS, ERROR } from '../actions/userListAction';

const INITIAL_STATE = {
  users: [
    {
      username: '',
      skills: [],
      desired: [],
      location: [],
      status: '',
    },
  ],
};

const listUsers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_USERS:
      return Object.assign({}, state, { users: action.users });
    case ERROR:
      return Object.assign({}, state, { errMessage: action.errMessage });
    case REHYDRATE: {
      const incoming = action.payload.userListReducer;
      if (incoming) {
        return { ...state, ...incoming, specialKey: processSpecial(incoming.specialKey) };
      }
      return state;
    }
    default:
      return state;
  }
};

export default listUsers;
