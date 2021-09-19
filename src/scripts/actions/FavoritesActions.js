const CartActions = {
  addItem(item) {
    return {
      type: 'ADD_ITEM',
      item,
    };
  },

  removeItem(item) {
    return {
      type: 'REMOVE_ITEM',
      item,
    };
  },

  toggleItem(item) {
    return {
      type: 'TOGGLE_ITEM',
      item,
    };
  },

  clear(item) {
    return {
      type: 'CLEAR',
      item,
    };
  },
};

export default CartActions;
