import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import loggedUserProp from '../../prop-types/loggedUser';
import NavLinkComponent from './nav-link.component';

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser.user,
  };
}

const NavComponent = ({ loggedUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <div className="container">
        <NavbarBrand activeClassName="active" tag={Link} to="/">
          LUL
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLinkComponent to="/">Home</NavLinkComponent>
            </NavItem>
            {loggedUser ? (
              <>
                <NavItem>
                  <NavLinkComponent to={`/profile/{${loggedUser.id}/favorites`}>
                    Favorites
                  </NavLinkComponent>
                </NavItem>
                <NavItem>
                  <NavLinkComponent to={`/profile/{${loggedUser.id}/friends`}>
                    Friends
                  </NavLinkComponent>
                </NavItem>
                <NavItem>
                  <NavLinkComponent to={`/profile/{${loggedUser.id}`}>
                    Profile
                  </NavLinkComponent>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <NavLinkComponent to="/sign-in">Sign in</NavLinkComponent>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

NavComponent.propTypes = {
  loggedUser: loggedUserProp,
};

export default connect(mapStateToProps)(NavComponent);
