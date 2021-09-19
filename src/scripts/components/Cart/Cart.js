import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import CartItem from './CartItem';
import './Cart.scss';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.clearCartHandler = (e) => {
      e.preventDefault();
      this.props.clearCart();
    };

    this.removeHandler = (product) => (e) => {
      e.preventDefault();
      this.props.removeProduct(product);
    };

    this.quantityChangeHandler = (product) => (e) => {
      const number = parseInt(e.target.value, 10);
      this.props.setProductQuantity(product, Number.isNaN(number) ? 0 : number);
    };

    this.hidePopupHandler = (e) => {
      e.preventDefault();
      this.props.hidePopup();
    };
  }

  calculateSum() {
    let sum = 0;
    this.props.cartProducts.forEach((productInfo) => {
      sum += productInfo.product.price * productInfo.quantity;
    });
    return sum;
  }

  render() {
    const { cartProducts } = this.props;
    const isEmpty = cartProducts.size === 0;

    return (
      <div className="cart">
        <button
          className="button button-red"
          type="button"
          onClick={this.clearCartHandler}
          disabled={isEmpty}
        >
          Clear cart
        </button>
        <ul className="cart-list">
          {cartProducts.map((productInfo) => (
            <CartItem
              info={productInfo}
              removeHandler={this.removeHandler}
              quantityChangeHandler={this.quantityChangeHandler}
            />
          ))}
        </ul>
        <div className="cart-footer">
          <button
            className="button button-gray cart-footer-continue"
            type="button"
            onClick={this.hidePopupHandler}
          >
            Continue shopping
          </button>
          <div className="cart-receipt">
            <div className="cart-receipt-sum">
              <span>{this.calculateSum()}</span>
              &nbsp;
              <i className="cart-receipt-currency" />
            </div>
            <Link
              className="button button-green cart-receipt-checkout"
              to="/checkout"
              disabled={isEmpty}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  cartProducts: PropTypes.instanceOf(Immutable.List).isRequired,
  setProductQuantity: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   cartProducts: state.cart,
// });
//
// const usedActions = {
//   setProductQuantity: CartActions.setQuantity,
//   removeProduct: CartActions.removeItem,
//   clearCart: CartActions.clear,
// };
//
// export default connect(mapStateToProps, usedActions)(Cart);
export default Cart;
