/* global window */
import axios from 'axios';
import profile from '../actions/profileActions';

const middleware = store => next => (action) => {
  // console.log('in middleware', action.type, profile.UPDATE_PROFILE);
  if (action.type === profile.PROFILE_DATA || action.type === profile.UPDATE_PROFILE) {
    // console.log('action profile status: ------------->', action.profile);
    if (action.profile.status === 'Code Now' && window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        axios.post('/api/users/position', Object.assign({}, pos, { username: action.profile.username }))
          .then(r => console.log('position sent to server', pos, r))
          .catch(e => console.log('something ugly happened', pos, e));
      });
    } else if (action.profile.status !== 'Code Now') {
      axios.post('/api/users/position', { username: action.profile.username })
          .then(r => console.log('position unsent to server', r))
          .catch(e => console.log('something ugly happened', e));
    }
  }
  return next(action);
};

export default middleware;



    // .then((response) => {
    //   console.log('me##################: ', updateObj);
    //   if (
    //     updateObj.toUpdate[0].typeUpdate === 'status'
    //     && updateObj.toUpdate[0].data === 'Code Now'
    //     && window.navigator && window.navigator.geolocation) {  
    //     console.log('me2##################: ', updateObj);
    //     window.navigator.geolocation.getCurrentPosition((position) => {
    //       const pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       };
    //       axios.post('/setPosition', Object.assign({}, pos, updateObj.username))
    //         .then((r) => { console.log('posted position successfully to server', r); })
    //         .catch((error) => { console.log('error posting position ', error); });
    //     });
    //   }
    //   // console.log('####################################');
    //   return response;
    // })