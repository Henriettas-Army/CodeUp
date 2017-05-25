import { combineReducers } from 'redux';
import auth from './loginReducer';
import profile from './profileReducer';
import events from './events';

const codeUpApp = combineReducers({
  auth,
  events,
  profile,
});

export default codeUpApp;
