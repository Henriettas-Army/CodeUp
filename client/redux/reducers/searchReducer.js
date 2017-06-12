/* global processSpecial */
import { REHYDRATE } from 'redux-persist/constants';
import { SEARCH } from '../actions/searchActions';

const initialState = {
  searchQuery: ''
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return { searchQuery: action.query };
    case REHYDRATE: {
      const incoming = action.payload.searchReducer;
      if (incoming) {
        return { ...state, ...incoming, specialKey: processSpecial(incoming.specialKey) };
      }
      return state;
    }
    default:
      return state;
  }
};

export default search;
