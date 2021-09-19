import { combineReducers } from 'redux';
import CartReducer from './CartReducer';
import CartPopupReducer from './CartPopupReducer';
import FavoritesReducer from './FavoritesReducer';

// The key of this object will be the name of the store
const RootReducer = combineReducers({
  cart: CartReducer,
  cartPopup: CartPopupReducer,
  favorites: FavoritesReducer,
});

export default RootReducer;
