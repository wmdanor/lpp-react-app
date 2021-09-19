import PropTypes from 'prop-types';
import * as React from 'react';

class FilterNumber extends React.Component {
  constructor(props) {
    super(props);

    this.changeHandler = (e)
    this.state = {

    }
  }

  render() {
    const { minValue, maxValue } = this.props;

    return (
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={}
        onChange={this.props.changeHandler}
      />
    )
  }
}

FilterNumber.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
};
