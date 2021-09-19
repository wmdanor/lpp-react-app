import PropTypes from 'prop-types';
import * as React from 'react';

function NavbarGroup({ children, align }) {
  const className = `navbar-group ${align}`;
  return <ul className={className}>{children}</ul>;
}

NavbarGroup.alignModes = {
  start: 'align-start',
  end: 'align-end',
};

NavbarGroup.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
};

NavbarGroup.defaultProps = {
  align: NavbarGroup.alignModes.start,
};

export default NavbarGroup;
