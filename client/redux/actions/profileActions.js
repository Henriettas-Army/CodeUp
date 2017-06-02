/* global window */
import axios from 'axios';

/* Action Types */
const PROFILE_DATA = 'PROFILE_DATA';
const LOAD_PROFILE = 'LOAD_PROFILE';
const ERROR_PROFILE = 'ERROR_PROFILE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const EDIT_PROFILE = 'EDIT_PROFILE';

/* Action Creators */
const loadProfile = () => ({
  type: LOAD_PROFILE,
});

const updateProfile = profile => ({
  type: UPDATE_PROFILE,
  profile,
});

const errorProfile = errMessage => ({
  type: ERROR_PROFILE,
  errMessage,
});

const profileData = profile => ({
  type: PROFILE_DATA,
  profile,
});
const editProfile = () => ({
  type: EDIT_PROFILE,
});

const config = {
  headers: { Authorization: window.localStorage.getItem('token') }
};

const fetchProfile = username => (
  axios.get(`/api/users/${username}`, config)
);


const loadProfileAsync = username => (
  function loadAsync(dispatch) {
    dispatch(loadProfile());
    return fetchProfile(username)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorProfile(response.data));
      } else {
        dispatch(profileData(response.data.user));
      }
    });
  }
);

// goes to server and server determines which user object item to update based on
// typeUpdate (status, skills, learn, location);
const putProfileUpdate = (updateObj) => {
  const username = window.localStorage.getItem('token');
  const toUpdate = updateObj.toUpdate;
  return axios.put(`/api/users/${username}`,
    {
      username,
      toUpdate,
    }, config)
    .then((response) => {
      console.log('me##################: ', updateObj);
      if (
        updateObj.toUpdate[0].typeUpdate === 'status'
        && updateObj.toUpdate[0].data === 'Code Now'
        && window.navigator && window.navigator.geolocation) {
        console.log('me2##################: ', updateObj);
        window.navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          axios.post('/setPosition', Object.assign({}, pos, updateObj.username))
            .then((r) => { console.log('posted position successfully to server', r); })
            .catch((error) => { console.log('error posting position ', error); });
        });
      }
      // console.log('####################################');
      return response;
    });
};

const updateProfileAsync = updateObj => (
  function updateAsync(dispatch) {
    dispatch(loadProfile());
    return putProfileUpdate(updateObj)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorProfile(response.data));
      } else {
        dispatch(updateProfile(response.data.user));
      }
    })
    .catch((err) => {
      dispatch(errorProfile(err));
    });
  }
);

export default {
  /* Action Types */
  PROFILE_DATA,
  LOAD_PROFILE,
  ERROR_PROFILE,
  UPDATE_PROFILE,
  EDIT_PROFILE,

  /* Action Creators */
  profileData,
  loadProfile,
  errorProfile,
  updateProfile,
  editProfile,

  /* Async Action Creators */
  loadProfileAsync,
  updateProfileAsync,
};
