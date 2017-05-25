import { combineReducers } from 'redux';
import auth from './loginReducer';
import profile from './profileReducer';
import events from './events';
import users from './userListReducer';

const codeUpApp = combineReducers({
  auth,
  events,
  profile,
  users,
});

export default codeUpApp;
