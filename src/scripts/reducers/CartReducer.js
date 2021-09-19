import { List } from 'immutable';

const CartReducer = (state = List(), action) => {
  let bufferIndex = 0;

  switch (action.type) {
    case 'ADD_ITEM':
      if (
        state.findIndex((item) => item.product.id === action.item.id) === -1
      ) {
        return state.push({
          product: { ...action.item },
          quantity: 1,
        });
      }
      return state;
    case 'REMOVE_ITEM':
      return state.filterNot((item) => item.product.id === action.item.id);
    case 'INCREASE':
      bufferIndex = state.findIndex(
        (item) => item.product.id === action.item.id,
      );
      if (bufferIndex === -1) {
        return state.push({
          product: { ...action.item },
          quantity: 1,
        });
      }
      return state.update(
        state.findIndex((item) => item.product.id === action.item.id),
        (item) => ({
          product: { ...item.product },
          quantity: item.quantity + 1,
        }),
      );
    case 'DECREASE':
      bufferIndex = state.findIndex(
        (item) => item.product.id === action.item.id,
      );
      if (bufferIndex === -1) {
        return state;
      }
      if (state.get(bufferIndex).quantity <= 1) {
        return state.delete(bufferIndex);
      }
      return state.update(bufferIndex, (item) => ({
        product: { ...item.product },
        quantity: item.quantity - 1,
      }));
    case 'SET_QUANTITY':
      if (action.quantity < 0) {
        return state;
      }
      bufferIndex = state.findIndex(
        (item) => item.product.id === action.item.id,
      );
      if (bufferIndex === -1) {
        return state;
      }
      // if (action.quantity === 0) {
      //   return state.delete(bufferIndex);
      // }
      return state.update(bufferIndex, (item) => ({
        product: { ...item.product },
        quantity: action.quantity,
      }));
    case 'CLEAR':
      return List();
    default:
      return state;
  }
};

export default CartReducer;
