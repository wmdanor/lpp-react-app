import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as React from 'react';
import DropdownItem from './DropdownItem';

function DropdownLink(props) {
  return (
    <DropdownItem>
      <NavLink to={props.to}>{props.children}</NavLink>
    </DropdownItem>
  );
}

DropdownLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
};

export default DropdownLink;
