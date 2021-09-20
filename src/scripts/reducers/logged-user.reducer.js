import { Map } from 'immutable';

export const SET_USER = 'SET_USER';

const LoggedUserReducer = (state = Map({ user: undefined }), action) => {
  switch (action.type) {
    case SET_USER:
      return state.set('user', action.payload);
    default:
      return state;
  }
};

export default LoggedUserReducer;
