import profile from '../actions/profileActions';

const INITIAL_STATE = {
  profile: {},
  status: 'READY',
  editing: false,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case profile.LOAD_PROFILE:
      return Object.assign({}, state, { status: 'LOADING' });
    case profile.PROFILE_DATA:
      return Object.assign({}, state, { status: 'READY' }, { profile: action.profile });
    case profile.ERROR_PROFILE:
      return Object.assign({}, state, { status: 'ERROR' });
    case profile.EDIT_PROFILE:
      return Object.assign({}, state, { editing: !state.editing });
    case profile.UPDATE_PROFILE:
      return Object.assign({}, state, { status: 'READY' }, { profile: action.profile }, { editing: false });
    default:
      return state;
  }
};
export default profileReducer;
