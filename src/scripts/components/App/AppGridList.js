import PropTypes from 'prop-types';
import * as React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { CartActions } from '../../actions';
import { GridList } from '../GridList';
import FavoritesActions from '../../actions/FavoritesActions';

function AppGridList({
  cartProducts,
  dataUrl,
  incrementProduct,
  searchProps,
  sortProps,
  pageSize,
  favoriteProducts,
  toggleFavorite,
}) {
  return (
    <GridList
      dataUrl={dataUrl}
      sortProps={sortProps}
      searchProps={searchProps}
      pageSize={pageSize}
      cartProducts={cartProducts}
      incrementProduct={incrementProduct}
      favoriteProducts={favoriteProducts}
      toggleFavorite={toggleFavorite}
    />
  );
}

AppGridList.propTypes = {
  dataUrl: PropTypes.string.isRequired,
  // data: PropTypes.array.isRequired,
  sortProps: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      text: PropTypes.string,
    }),
  ).isRequired,
  searchProps: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  cartProducts: PropTypes.instanceOf(Immutable.List),
  incrementProduct: PropTypes.func,
  favoriteProducts: PropTypes.instanceOf(Immutable.List),
  toggleFavorite: PropTypes.func,
};

const mapStateToProps = (state) => ({
  cartProducts: state.cart,
  favoriteProducts: state.favorites,
});

const usedActions = {
  incrementProduct: CartActions.increase,
  toggleFavorite: FavoritesActions.toggleItem,
};

export default connect(mapStateToProps, usedActions)(AppGridList);
