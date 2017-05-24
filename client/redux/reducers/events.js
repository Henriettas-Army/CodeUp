const events = require('../actions/eventActions');

const eventsReducer = (state = { events: [], status: events.SUCCESS, error: null }, action) => {
  switch (action.type) {
    case events.LOADING:
      return Object.assign({}, state, { status: 'LOADING' });
    case events.ERROR:
      return Object.assign({}, state, { status: 'ERROR', error: action.error });
    case events.SUCCESS:
      return Object.assign({}, state, { status: 'READY', events: action.events });
    default:
      return state;
  }
};

module.exports = eventsReducer;
