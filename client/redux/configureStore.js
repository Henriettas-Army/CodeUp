import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers/mainReducer';

export default function configureStore() {
  return createStore(
      mainReducer,
      undefined, // initialState,
      applyMiddleware(thunk),
  );
}
