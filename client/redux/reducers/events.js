/* global processSpecial */
import { REHYDRATE } from 'redux-persist/constants';
import events from '../actions/eventActions';

const INITIAL_STATE = {
  events: [],
  status: 'READY',
  error: null,
};

const eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case events.LOADING:
      return Object.assign({}, state, { status: 'LOADING' });
    case events.ERROR:
      return Object.assign({}, state, { status: 'ERROR', error: action.error });
    case events.DATA:
      return Object.assign({}, state, { status: 'READY' }, { events: action.events });
    case REHYDRATE: {
      const incoming = action.payload.eventsReducer;
      if (incoming) {
        return { ...state, ...incoming, specialKey: processSpecial(incoming.specialKey) };
      }
      return state;
    }
    default:
      return state;
  }
};

export default eventsReducer;
