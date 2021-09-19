const CartPopupActions = {
  show() {
    console.log();
    return {
      type: 'SHOW',
    };
  },

  hide() {
    return {
      type: 'HIDE',
    };
  },
};

export default CartPopupActions;
