import PropTypes from 'prop-types';
import * as React from 'react';

function NavbarItem(props) {
  return <li className="navbar-item">{props.children}</li>;
}

NavbarItem.propTypes = {
  children: PropTypes.node,
};

export default NavbarItem;
