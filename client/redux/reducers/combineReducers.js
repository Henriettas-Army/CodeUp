// reducer.js
import { combineReducers } from 'redux';
import auth from './loginReducer';
import events from './events';

const codeUpApp = combineReducers({
  auth,
  events,
});

export default codeUpApp;
