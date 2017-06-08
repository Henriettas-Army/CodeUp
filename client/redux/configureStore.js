import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import positionMiddleware from './middlewares/positionMiddleware';

import combineReducers from './reducers/combineReducers';

const store = composeWithDevTools(
  applyMiddleware(thunk, positionMiddleware),
  //autoRehydrate(),
)(createStore)(combineReducers);

persistStore(store);

export default store;
