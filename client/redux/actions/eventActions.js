const axios = require('axios');

/* Action Types */
const LOADING = 'LOADING';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

/* Action Creators */

const errorEvents = error => ({ type: ERROR, error });
const loadingEvents = () => ({ type: LOADING });
const successEvents = events => ({ type: SUCCESS, events });

const urlGetEvents = '/api/events';
const urlPostEvents = '/api/events';

const loadEventsAsync = () => (dispatch) => {
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

const postEventAsync = event => (dispatch) => {
  dispatch(loadingEvents());

  axios.post(urlPostEvents, event)
    .then((response) => {
      if (response.ok !== true) {
        throw new Error('Error posting event');
      }
      return response;
    })
    .then(() => {
      dispatch(loadEventsAsync());
    })
    .catch((err) => {
      dispatch(errorEvents(err));
    });
};

module.exports = {
  /** Action Types */
  SUCCESS,
  ERROR,
  LOADING,

  /** Action Creators */
  errorEvents,
  loadingEvents,
  successEvents,

  /** Async Action Creators */
  postEventAsync,
  loadEventsAsync,
};

