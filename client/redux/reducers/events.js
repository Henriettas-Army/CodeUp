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
    default:
      return state;
  }
};

// var eventsReducer2 = (state, action) => {
//   console.log(JSON.stringify(events));
//   var newState = eventsReducer(state, action);
//   console.log('shallow equality: ', state === newState);
//   console.log('previous state: ', state);
//   console.log('new State: ', newState);
//   return newState;
// }

export default eventsReducer;
