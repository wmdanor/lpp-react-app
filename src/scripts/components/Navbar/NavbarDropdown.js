import PropTypes from 'prop-types';
import * as React from 'react';
import NavbarItem from './NavbarItem';

function NavbarDropdown(props) {
  return <NavbarItem className="dropdown">{props.children}</NavbarItem>;
}

NavbarDropdown.propTypes = {
  children: PropTypes.node,
};
export default NavbarDropdown;
