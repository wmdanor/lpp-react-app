import { combineReducers, createStore } from 'redux';
import LoggedUserReducer from './logged-user.reducer';

export const reducer = combineReducers({
  loggedUser: LoggedUserReducer,
});

export const store = createStore(reducer);
