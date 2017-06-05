/* global window */
import axios from 'axios';
import profile from '../actions/profileActions';

let positionUpdater = null;

const sendPositionOverAndOverAgain = (username) => {
  if (positionUpdater !== null) {
    return;
  }
  let positionAvailable = false;
  if (window.navigator && window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      positionAvailable = true;
      axios.post('/api/users/position',
        Object.assign({}, pos, { username }));
    });
  }
  if (positionAvailable) {
    positionUpdater = setTimeout(sendPositionOverAndOverAgain(username), 30000);
  }
};

const stopSendingPositionOverAndOverAgain = (username) => {
  if (positionUpdater === null) {
    return;
  }
  axios.post('/api/users/position', { username });
  clearTimeout(positionUpdater);
  positionUpdater = null;
};

const middleware = store => next => (action) => {
  const state = store.getState();
  if (state.profile.profile.status === 'Code Now' && positionUpdater === null) {
    sendPositionOverAndOverAgain(state.auth.isAuthenticated);
  }
  if (action.type === profile.UPDATE_PROFILE) {
    if (action.profile.status === 'Code Now' && positionUpdater === null && window.navigator && window.navigator.geolocation) {
      sendPositionOverAndOverAgain(action.profile.username);
    } else if (action.profile.status !== 'Code Now') {
      stopSendingPositionOverAndOverAgain(state.auth.isAuthenticated);
    }
  }
  return next(action);
};

export default middleware;
