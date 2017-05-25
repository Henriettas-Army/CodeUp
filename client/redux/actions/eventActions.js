import axios from 'axios';

/* Action Types */
const LOADING = 'LOADING';
const ERROR = 'ERROR';
const DATA = 'DATA';

/* Action Creators */

const errorEvents = error => ({ type: ERROR, error });
const loadingEvents = () => ({ type: LOADING });
const dataEvents = events => ({ type: DATA, events });

const urlGetEvents = '/api/events';
const urlPostEvents = '/api/events';

export const loadEventsAsync = () => (dispatch) => {
  dispatch(loadingEvents());

  axios.get(urlGetEvents)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorEvents(response.data.error));
      } else {
        dispatch(dataEvents(response.data.events));
      }
    });
};

const postEventAsync = event => (dispatch) => {
  dispatch(loadingEvents());

  axios.post(urlPostEvents, event)
    .then((response) => {
      if (!response.data.ok) {
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

export default {
  /** Action Types */
  DATA,
  ERROR,
  LOADING,

  /** Action Creators */
  errorEvents,
  loadingEvents,
  dataEvents,

  /** Async Action Creators */
  postEventAsync,
  loadEventsAsync,
};

