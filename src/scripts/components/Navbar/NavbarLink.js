import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as React from 'react';
import NavbarItem from './NavbarItem';

function NavbarLink(props) {
  return (
    <NavbarItem>
      <NavLink
        className="navbar-link"
        activeClassName="active"
        exact
        to={props.to}
      >
        {props.children}
      </NavLink>
    </NavbarItem>
  );
}

NavbarLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
};

export default NavbarLink;
