import PropTypes from 'prop-types';
import * as React from 'react';

function DropdownItem(props) {
  return <li className="dropdown-item">{props.children}</li>;
}

DropdownItem.propTypes = {
  children: PropTypes.node,
};

export default DropdownItem;
