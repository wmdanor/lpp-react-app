import PropTypes from 'prop-types';
import * as React from 'react';
import './Product.scss';

class Product extends React.Component {
  constructor(props) {
    super(props);

    const { product } = props;

    this.addToCartHandler = (e) => {
      e.preventDefault();
      props.incrementProduct(product);
    };

    this.addMoreHandler = (e) => {
      e.preventDefault();
      props.incrementProduct(product);
    };

    this.toggleFavoriteHandler = (e) => {
      e.preventDefault();
      props.toggleFavorite(product);
    };
  }

  // isInCart(product) {
  //   const { cartProducts } = this.props;
  //   return (
  //     cartProducts.findIndex((item) => item.product.id === product.id) !== -1
  //   );
  // }

  getButton(product) {
    if (this.props.isInCart(product)) {
      return (
        <button
          className="button button-green"
          type="button"
          onClick={this.addMoreHandler}
        >
          Add more
        </button>
      );
    }
    return (
      <button
        className="button button-green"
        type="button"
        onClick={this.addToCartHandler}
      >
        Add to cart
      </button>
    );
  }

  render() {
    const { product } = this.props;
    return (
      <div className="product" key={product.id}>
        <button
          className={`product-favorite${
            this.props.isFavorite(product) ? ' favorite' : ''
          }`}
          type="button"
          onClick={this.toggleFavoriteHandler}
        />
        <img
          className="product-image"
          src={product.imageUrl}
          alt={product.name}
        />
        <h3 className="product-name">{product.name}</h3>
        <div className="product-prices">
          <p>
            <span>{product.price}</span>
            &nbsp;
            <i className="product-prices-currency" />
          </p>
          {this.getButton(product)}
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  // product: PropTypes.object.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  // cartProducts: PropTypes.instanceOf(Immutable.List),
  isInCart: PropTypes.func.isRequired,
  incrementProduct: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   cartProducts: state.cart,
// });
//
// const usedActions = {
//   incrementProduct: CartActions.increase,
// };
//
// export default connect(mapStateToProps, usedActions)(Product);
export default Product;
