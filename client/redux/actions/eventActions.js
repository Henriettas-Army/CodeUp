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

const loadEventsAsync = () => (dispatch) => {
  dispatch(loadingEvents());

  axios.get(urlGetEvents)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorEvents(response.data.error));
      } else {
        console.log('received events: ', response.data.events);
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

const deleteEventAsync = id => (dispatch) => {
  dispatch(loadingEvents());

  axios.post(urlDeleteEvents, {id: id})
    .then((response) => {
      console.log(response);
      if (!response.data.ok) {
        throw new Error('Error deleting event');
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
