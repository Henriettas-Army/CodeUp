/* global processSpecial */
import { REHYDRATE } from 'redux-persist/constants';
import profile from '../actions/profileActions';

const INITIAL_STATE = {
  profile: {},
  status: 'READY',
  errMessage: '',
  editing: false,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case profile.LOAD_PROFILE:
      return Object.assign({}, state, { status: 'LOADING' });
    case profile.PROFILE_DATA:
      return Object.assign({}, state, { status: 'READY' }, { profile: action.profile });
    case profile.ERROR_PROFILE:
      return Object.assign({}, state, { status: 'ERROR' }, { errMessage: action.errMessage.toString() });
    case profile.EDIT_PROFILE:
      return Object.assign({}, state, { editing: !state.editing });
    case profile.UPDATE_PROFILE:
      return Object.assign({}, state, { status: 'READY' }, { profile: action.profile }, { editing: false });
    case REHYDRATE: {
      const incoming = action.payload.profileReducer;
      if (incoming) {
        return { ...state, ...incoming, specialKey: processSpecial(incoming.specialKey) };
      }
      return state;
    }
    default:
      return state;
  }
};
export default profileReducer;
