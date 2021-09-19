import PropTypes from 'prop-types';
import * as React from 'react';
import Immutable from 'immutable';
import SortBar from './SortBar';
import SearchBar from './SearchBar';
import Paginator from './Paginator';
import Product from './Product';
import './GridList.scss';

class GridList extends React.Component {
  constructor(props) {
    super(props);

    this.initialData = [];

    this.state = {
      afterFilter: this.initialData,
      afterSearch: this.initialData,
      afterSort: this.initialData,
      afterPaginate: [],
    };

    this.updateData = (state) => {
      this.setState(state);
    };

    this.isInCart = (product) => {
      const { cartProducts } = this.props;
      return (
        cartProducts.findIndex((item) => item.product.id === product.id) !== -1
      );
    };

    this.isFavorite = (product) => {
      const { favoriteProducts } = this.props;
      return (
        favoriteProducts.findIndex((item) => item.id === product.id) !== -1
      );
    };

    this.scrollRef = React.createRef();
    this.scrollToComponent = () => {
      this.scrollRef.current.scrollIntoView();
    };
  }

  componentDidMount() {
    fetch(this.props.dataUrl)
      .then((res) => res.json())
      .then((data) => {
        this.initialData = data.data;
        this.setState({
          afterFilter: this.initialData,
          afterSearch: this.initialData,
          afterSort: this.initialData,
          afterPaginate: [],
        });
      });
  }

  createItemsList(items) {
    if (items.length) {
      return items.map((item) => (
        <li key={item.id} className="gridlist-item">
          <Product
            product={item}
            isInCart={this.isInCart}
            incrementProduct={this.props.incrementProduct}
            toggleFavorite={this.props.toggleFavorite}
            isFavorite={this.isFavorite}
          />
        </li>
      ));
    }
    return <li className="gridlist-item-empty">Empty</li>;
  }

  render() {
    const { sortProps, searchProps, pageSize } = this.props;

    return (
      <div ref={this.scrollRef}>
        <div className="gridlist-bar">
          <SearchBar
            initialData={this.state.afterFilter}
            update={this.updateData}
            searchProps={searchProps}
            isFavorite={this.isFavorite}
          />
          <SortBar
            data={this.state.afterSearch}
            update={this.updateData}
            sortProps={sortProps}
          />
        </div>
        <ul className="gridlist-list">
          {this.createItemsList(this.state.afterPaginate)}
        </ul>
        <Paginator
          update={this.updateData}
          data={this.state.afterSort}
          pageSize={pageSize}
          scrollToTop={this.scrollToComponent}
        />
      </div>
    );
  }
}

GridList.propTypes = {
  dataUrl: PropTypes.string.isRequired,
  sortProps: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      text: PropTypes.string,
    }),
  ).isRequired,
  searchProps: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  cartProducts: PropTypes.instanceOf(Immutable.List).isRequired,
  incrementProduct: PropTypes.func.isRequired,
  favoriteProducts: PropTypes.instanceOf(Immutable.List).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default GridList;
