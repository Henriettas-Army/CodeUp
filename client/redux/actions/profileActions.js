import axios from 'axios';

/* Action Types */
const PROFILE_DATA = 'PROFILE_DATA';
const LOAD_PROFILE = 'LOAD_PROFILE';
const ERROR_PROFILE = 'ERROR_PROFILE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';

/* Action Creators */
const loadProfile = () => ({
  type: LOAD_PROFILE,
});

const updateProfile = profile => ({
  type: UPDATE_PROFILE,
  profile,
});

const errorProfile = () => ({
  type: ERROR_PROFILE,
});

const profileData = profile => ({
  type: PROFILE_DATA,
  profile,
});

const fetchProfile = username => (
  axios.get(`/api/users/${username}`)
);


const loadProfileAsync = username => (
  function loadAsync(dispatch) {
    dispatch(loadProfile());
    return fetchProfile(username)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorProfile('unable to find user'));
      } else {
        dispatch(profileData(response.data.user));
      }
    });
  }
);

// goes to server and server determines which user object item to update based on
// typeUpdate (status, skills, learn);
const putProfileUpdate = (updateObj) => {
  const username = updateObj.username;
  const data = updateObj.data;
  const typeUpdate = updateObj.typeUpdate;
  axios.put(`/api/users/${username}`,
    {
      username,
      data,
      typeUpdate,
    });
};

const updateProfileAsync = updateObj => (
  function updateAsync(dispatch) {
    dispatch(loadProfile());
    return putProfileUpdate(updateObj)
    .then((response) => {
      if (!response.data.ok) {
        dispatch(errorProfile('unable to update user info'));
      } else {
        dispatch(profileData(response.data.user));
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

  /* Action Creators */
  profileData,
  loadProfile,
  errorProfile,
  updateProfile,

  /* Async Action Creators */
  loadProfileAsync,
  updateProfileAsync,
};
