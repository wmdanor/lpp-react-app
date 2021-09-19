import PropTypes from 'prop-types';
import * as React from 'react';
import getHashCode from '../../getHashCode';

const filterConfig = [
  {
    property: 'price',
    filterType: 1,
  },
];

class FilterMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  filter(query) {
    this.setState({
      query,
    });

    const data = this.props.initialData;
    const { searchProps, update } = this.props;

    const filter = data.filter((item) => {
      for (let i = 0; i < searchProps.length; i += 1) {
        if (item[searchProps[i]].toLowerCase().startsWith(query)) {
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

    update(filter);
    update({
      afterFilter: filter,
    });
  }

  render() {
    return (
      <aside>
        <input
          type="text"
          value={this.state.query}
          placeholder="Enter search query..."
          onChange={(e) => this.find(e.target.value)}
        />
      </aside>
    );
  }
}

FilterMenu.propTypes = {
  initialData: PropTypes.array.isRequired,
  // data: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  searchProps: PropTypes.array.isRequired,
  filterConfig: PropTypes.array.isRequired,
};

export default FilterMenu;
