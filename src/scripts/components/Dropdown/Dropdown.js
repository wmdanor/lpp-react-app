import PropTypes from 'prop-types';
import * as React from 'react';

function Dropdown(props) {
  return <div className="dropdown">{props.children}</div>;
}

Dropdown.propTypes = {
  children: PropTypes.node,
};

export default Dropdown;
