export const SET_USER = 'SET_USER';

const LoggedUserReducer = (state = { user: undefined }, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default LoggedUserReducer;
