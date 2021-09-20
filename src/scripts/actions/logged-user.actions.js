import { SET_USER } from '../reducers/logged-user.reducer';

const LoggedUserActions = {
  setUser(user) {
    return {
      type: SET_USER,
      payload: user,
    };
  },
};

export default LoggedUserActions;
