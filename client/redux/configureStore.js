import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers/mainReducer';

export default function configureStore(initialState) {
  return createStore(
      mainReducer,
      initialState,
      applyMiddleware(thunk),
  );
}
