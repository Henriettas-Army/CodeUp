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

const urlEvents = '/api/events';
const urlDeleteEvents = '/api/events/delete';

const config = {
  headers: {
    Authorization: window.localStorage.getItem('token'),
    'Content-Type': 'application/json',
  }
};

const loadEventsAsync = () => (dispatch) => {
  dispatch(loadingEvents());

  axios.get(urlEvents, config)
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

  axios.post(urlEvents, event, config)
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

  axios.delete(urlDeleteEvents, { id }, config)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorEvents(response.data));
      } else {
        dispatch(loadEventsAsync());
      }
    });
};

// server parses eventObj and updates DB
const putEventUpdate = (eventObj) => {
  const id = eventObj.id;
  const toUpdate = eventObj.toUpdate;
  return axios.put(urlEvents,
    {
      id,
      toUpdate,
    }, config);
};

const updateEventsAsync = eventObj => (dispatch) => {
  dispatch(loadingEvents());
  return putEventUpdate(eventObj)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorEvents(response.data));
      } else {
        // update successful --- added to pinned
        dispatch(loadEventsAsync());
      }
    })
    .catch((err) => {
      dispatch(errorEvents(err));
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
  updateEventsAsync,
};
