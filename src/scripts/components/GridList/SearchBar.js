import PropTypes from 'prop-types';
import * as React from 'react';
import getHashCode from '../../getHashCode';
import './SearchBar.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.hashCode = null;

    this.state = {
      query: '',
      isFavorite: false,
    };

    this.inputHandler = (e) => {
      const query = e.target.value;
      this.setState({
        query,
      });
      this.find();
    };

    this.checkboxHandler = (e) => {
      const isFavorite = e.target.checked;
      this.setState({
        isFavorite,
      });
      this.find();
    };
  }

  find() {
    const { query, isFavorite } = this.state;
    const lquery = query.toLowerCase();
    const data = this.props.initialData;
    const { searchProps, update } = this.props;

    const filter = data.filter((item) => {
      for (let i = 0; i < searchProps.length; i += 1) {
        if (isFavorite && !this.props.isFavorite(item)) {
          return false;
        }
        if (item[searchProps[i]].toLowerCase().includes(lquery)) {
          return true;
        }
      }
      return false;
    });

    const newHashCode = getHashCode(filter);
    if (this.hashCode === newHashCode) {
      return;
    }
    this.hashCode = newHashCode;

    // update(filter);
    update({
      afterSearch: filter,
    });
  }

  componentDidMount() {
    this.find();
  }

  componentDidUpdate() {
    this.find();
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          value={this.state.query}
          placeholder="Enter search query..."
          onChange={this.inputHandler}
        />
        <label className="search-bar-check">
          <input
            type="checkbox"
            checked={this.state.isFavorite}
            onChange={this.checkboxHandler}
          />
          Favorites
        </label>
      </div>
    );
  }
}

SearchBar.propTypes = {
  initialData: PropTypes.array.isRequired,
  // data: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  searchProps: PropTypes.array.isRequired,
  isFavorite: PropTypes.func.isRequired,
};

export default SearchBar;
