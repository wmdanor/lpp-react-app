import { List } from 'immutable';

// Not Set because no custom comparator available
const FavoritesReducer = (state = List(), action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.findIndex((item) => item.id === action.item.id) === -1) {
        return state.push({
          ...action.item,
        });
      }
      return state;
    case 'REMOVE_ITEM':
      return state.filterNot((item) => item.id === action.item.id);
    case 'TOGGLE_ITEM':
      if (state.findIndex((item) => item.id === action.item.id) === -1) {
        return state.push({
          ...action.item,
        });
      }
      return state.filterNot((item) => item.id === action.item.id);
    case 'CLEAR':
      return List();
    default:
      return state;
  }
};

export default FavoritesReducer;
