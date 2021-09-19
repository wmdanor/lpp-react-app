import PropTypes from 'prop-types';
import * as React from 'react';

function DropdownList(props) {
  return <ul className="dropdown-list">{props.children}</ul>;
}

DropdownList.propTypes = {
  children: PropTypes.node,
};

export default DropdownList;
