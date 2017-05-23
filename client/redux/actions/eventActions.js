const axios = require('axios');

/* Actions */
const POST_EVENT = 'POST_EVENT';
const FETCH_EVENTS = 'GET_EVENTS';
const LOADING_EVENTS = 'LOADING_EVENTS';
const ERROR_EVENTS = 'ERROR_EVENTS';
const SUCCESS_EVENTS = 'SUCCESS_EVENTS';

/* Action Creators */

const errorEvents = err => ({ type: ERROR_EVENTS, error: err });
const loadingEvents = () => ({ type: LOADING_EVENTS });
const successEvents = events => ({ type: SUCCESS_EVENTS, events });

const urlGetEvents = '';
const urlPostEvents = '';

const fetchEvents = () => (dispatch) => {
  dispatch(loadingEvents());

  axios.get(urlGetEvents)
    .then((response) => {
      if (response.ok === false) {
        dispatch(errorEvents(response.err));
      } else {
        dispatch(successEvents(response.events));
      }
    });
};

const postEvent = event => (dispatch) => {
  dispatch(loadingEvents());

  axios.post(urlPostEvents, event)
    .then((response) => { 
      if (response.ok !== true) {
        throw new Error('Error posting event');
      }
      return response;
    })
    .then(() => {
      dispatch(fetchEvents());
    })
    .catch((err) => {
      dispatch(errorEvents(err));
    });
}

module.exports = {
  POST_EVENT,
  FETCH_EVENTS,
  LOADING_EVENTS,
  ERROR_EVENTS,
  postEvent,
  fetchEvents,
  errorEvents,
  loadingEvents,
};

