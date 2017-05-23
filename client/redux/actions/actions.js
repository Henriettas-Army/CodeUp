// actions.js
const CHANGE_STATE = 'CHANGE_STATE';
const POST_EVENT = 'POST_EVENT';
const GET_EVENTS = 'GET_EVENTS';

const changeState = newState => ({ type: CHANGE_STATE, newState });
const postEvent = event => ({ type: POST_EVENT, event });
const getEvents = () => ({ type: GET_EVENTS });

module.exports = {
  CHANGE_STATE,
  POST_EVENT,
  GET_EVENTS,
  changeState,
  postEvent,
  getEvents,
};
