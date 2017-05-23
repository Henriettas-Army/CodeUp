var actions = require('../actions/actions');

const eventsReducer = (state = { events: [], status: 'READY' }, action) => {
  switch (action.type) {
    case actions.GET_EVENTS:
      
      break;
    case actions.POST_EVENT:

      break;
    default:
      return state;
  }
};

module.exports = eventsReducer;
