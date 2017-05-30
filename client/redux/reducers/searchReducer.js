import {
  SEARCH,
} from '../actions/searchActions';

const initialState = {
  searchQuery: ''
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return { searchQuery: action.query };

    default:
      return state;
  }
};

export default search;
