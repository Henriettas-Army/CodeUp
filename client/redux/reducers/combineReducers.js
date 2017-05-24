// reducer.js
import { combineReducers } from 'redux';
import auth from './loginReducer';

const codeUpApp = combineReducers({
  auth,
});

export default codeUpApp;
