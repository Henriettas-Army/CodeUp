import { createStore, applyMiddleware } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import combineReducers from './reducers/combineReducers';

const store = composeWithDevTools(
  applyMiddleware(thunk),
  autoRehydrate(),
)(createStore)(combineReducers);

persistStore(store);

export default store;
