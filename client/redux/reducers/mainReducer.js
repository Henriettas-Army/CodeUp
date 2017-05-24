// import { combineReducers } from 'redux';
import events from './events';

const INITAL_STATE = {
  events: {
    events: [],
    status: 'READY',
    error: null,
  },
};

export default (state = INITAL_STATE, action) => ({ events: events(state.events, action) });
