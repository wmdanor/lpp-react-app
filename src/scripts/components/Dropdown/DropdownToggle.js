import PropTypes from 'prop-types';
import * as React from 'react';

function DropdownToggle(props) {
  return <span className="dropdown-toggle">{props.children}</span>;
}

DropdownToggle.propTypes = {
  children: PropTypes.node,
};

export default DropdownToggle;
