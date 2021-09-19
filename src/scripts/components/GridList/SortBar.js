import PropTypes from 'prop-types';
import * as React from 'react';
import getHashCode from '../../getHashCode';
import './SortBar.scss';

class SortBar extends React.Component {
  constructor(props) {
    super(props);

    this.hashCode = null;

    this.sortProperty = 'id';
    this.sortDirection = 1;
  }

  sort() {
    const { update, data } = this.props;
    const { sortProperty, sortDirection } = this;

    const sorted = [...data].sort(
      (a, b) => sortDirection * (a[sortProperty] > b[sortProperty] ? 1 : -1),
    );

    const newHashCode = getHashCode(sorted);
    if (this.hashCode === newHashCode) {
      return;
    }
    this.hashCode = newHashCode;

    // update(sorted);
    update({
      afterSort: sorted,
    });
  }

  setProperty(property) {
    this.sortProperty = property;
    this.sort();
  }

  setDirection(direction) {
    let newDirection = 0;
    if (direction === 'asc') {
      newDirection = 1;
    } else if (direction === 'desc') {
      newDirection = -1;
    }

    if (newDirection !== 0) {
      this.sortDirection = newDirection;
      this.sort();
    }
  }

  componentDidMount() {
    this.sort();
  }

  componentDidUpdate() {
    this.sort();
  }

  render() {
    const { sortProps } = this.props;

    return (
      <div className="sort-bar">
        <select
          className="sort-bar-select"
          onChange={(e) => this.setProperty(e.target.value)}
        >
          {sortProps.map((item) => (
            <option key={`sort-prop-${item.property}`} value={item.property}>
              {item.text ? item.text : item.property}
            </option>
          ))}
        </select>
        <select
          className="sort-bar-select"
          onChange={(e) => this.setDirection(e.target.value)}
        >
          <option key="sort-direction-asc" value="asc">
            Ascending
          </option>
          <option key="sort-direction-desc" value="desc">
            Descending
          </option>
        </select>
      </div>
    );
  }
}

SortBar.propTypes = {
  // initialData: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  sortProps: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      text: PropTypes.string,
    }),
  ).isRequired,
};

export default SortBar;
