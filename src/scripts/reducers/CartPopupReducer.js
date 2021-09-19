import { Map } from 'immutable';

const CartPopupReducer = (state = Map({ shown: false }), action) => {
  switch (action.type) {
    case 'SHOW':
      return state.set('shown', true);
    case 'HIDE':
      return state.set('shown', false);
    default:
      return state;
  }
};

export default CartPopupReducer;
