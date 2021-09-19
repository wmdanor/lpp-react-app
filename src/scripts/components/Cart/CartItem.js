import PropTypes from 'prop-types';
import * as React from 'react';
import './CartItem.scss';

function CartItem({ info, quantityChangeHandler, removeHandler }) {
  const { product, quantity } = info;

  return (
    <li key={`cart-item-${product.id}`} className="cart-item">
      <div className="cart-item-body">
        <div className="cart-item-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="cart-item-name">{product.name}</div>
        <button
          type="button"
          className="cart-item-remove"
          onClick={removeHandler(product)}
        >
          X
        </button>
      </div>
      <div className="cart-item-footer">
        <div className="cart-item-counter">
          <p className="cart-item-counter-price">{product.price} $</p>
          <i className="cart-item-counter-multiply" />
          <input
            className="cart-item-counter-input"
            type="number"
            value={quantity}
            min="0"
            onChange={quantityChangeHandler(product)}
          />
        </div>
        <div className="cart-item-full-price">{product.price * quantity} $</div>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  info: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  removeHandler: PropTypes.func.isRequired,
  quantityChangeHandler: PropTypes.func.isRequired,
};

export default CartItem;
