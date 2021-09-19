import PropTypes from 'prop-types';
import * as React from 'react';
import { createRef } from 'react';

const rangeStyle = {
  position: 'absolute',
};

class TwoRangeInput extends React.Component {
  constructor(props) {
    super(props);

    this.minValue = createRef();
    this.maxValue = createRef();

    const { minValue, maxValue } = this.props;

    this.state = {
      from: minValue,
      to: maxValue,
    };

    this.fromInputHandler = (e) => {
      const value = Math.min(Number(e.target.value), this.state.to - 1);
      this.setState({
        from: value,
      });
    };

    this.toInputHandler = (e) => {
      const value = Math.max(Number(e.target.value), this.state.from + 1);
      this.setState({
        to: value,
      });
    };
  }

  getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  componentDidUpdate() {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }

  render() {
    const { minValue, maxValue } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={this.state.from}
          ref={this.minValue}
          onChange={this.fromInputHandler}
          className="thumb thumb--left"
          style={rangeStyle}
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={this.state.to}
          ref={this.maxValue}
          onChange={this.toInputHandler}
          className="thumb thumb--right"
          style={rangeStyle}
        />
        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">{this.state.from}</div>
          <div className="slider__right-value">{this.state.to}</div>
        </div>
      </div>
    );
  }
}

TwoRangeInput.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

export default TwoRangeInput;
