const eventActions = require('../actions/eventActions');

const eventsReducer = (state = { events: [], status: 'READY' }, action) => {
  switch (action.type) {
    case eventActions.LOADING_EVENTS:
      return Object.assign({}, state, { status: 'LOADING' });
    case eventActions.ERROR_EVENTS:
      return Object.assign({}, state, { status: 'ERROR' });
    case eventActions.SUCCESS_EVENTS:
      return Object.assign({}, state, { status: 'READY' });
    default:
      return state;
  }
};

module.exports = eventsReducer;
