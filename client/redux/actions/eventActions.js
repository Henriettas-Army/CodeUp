/* global window */
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
const urlDeleteEvents = '/api/events/delete';

const config = {
  headers: { Authorization: window.localStorage.getItem('token') }
};

const loadEventsAsync = () => (dispatch) => {
  dispatch(loadingEvents());

  axios.get(urlGetEvents, config)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorEvents(response.data));
      } else {
        dispatch(dataEvents(response.data.events));
      }
    });
};

const postEventAsync = event => (dispatch) => {
  dispatch(loadingEvents());

  axios.post(urlPostEvents, event, config)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorEvents(response.data));
      } else {
        dispatch(loadEventsAsync());
      }
    });
};

const deleteEventAsync = id => (dispatch) => {
  dispatch(loadingEvents());

  axios.post(urlDeleteEvents, { id }, config)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorEvents(response.data));
      } else {
        dispatch(loadEventsAsync());
      }
    });
};

// TODO: Refactor delete and post events to relentlessly obliterate duplicate code.

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
  deleteEventAsync,
};
