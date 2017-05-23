const axios = require('axios');

/* Action Types */
const LOADING = 'LOADING';
const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

/* STATUS */
const StatusEnum = {
  LOADING: 1,
  READY: 2,
  ERROR_LOADING: 4,
  ERROR_POSTING: 8,
};

// add validation errors??

/* Action Creators */

const errorEvents = (errorType, error) => ({ type: ERROR, errorType, error });
const loadingEvents = () => ({ type: LOADING });
const successEvents = events => ({ type: SUCCESS, events });

const urlGetEvents = '/api/events';
const urlPostEvents = '/api/events';

const loadEventsAsync = () => (dispatch) => {
  dispatch(loadingEvents());

  axios.get(urlGetEvents)
    .then((response) => {
      if (response.ok === false) {
        dispatch(errorEvents(StatusEnum.ERROR_LOADING, response.err));
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
      dispatch(errorEvents(StatusEnum.ERROR_POSTING, err));
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

  /** Status Values Enum */
  StatusEnum,
};

