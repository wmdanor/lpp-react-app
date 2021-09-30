import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const NavLinkComponent = ({ children, to }) => (
  <NavLink activeClassName="active" tag={Link} to={to}>
    {children}
  </NavLink>
);

NavLinkComponent.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};

export default NavLinkComponent;
