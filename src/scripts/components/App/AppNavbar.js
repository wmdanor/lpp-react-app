import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import {
  Navbar,
  NavbarGroup,
  NavbarDropdown,
  NavbarItem,
  NavbarLink,
} from '../Navbar';
import { DropdownItem, DropdownList, DropdownToggle } from '../Dropdown';
import { CartPopupActions } from '../../actions';

function AppNavbar({ cartProducts, showCart }) {
  const showCartHandler = (e) => {
    e.preventDefault();
    showCart();
  };

  const countProductsInCart = () => {
    let number = 0;
    cartProducts.forEach((item) => {
      number += item.quantity;
    });
    return number;
  };

  return (
    <Navbar>
      <NavbarGroup>
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="/contacts">Contacts</NavbarLink>
        <NavbarLink to="/about">About</NavbarLink>
        <NavbarDropdown>
          <DropdownToggle>Dropdown</DropdownToggle>
          <DropdownList>
            <DropdownItem>One</DropdownItem>
            <DropdownItem>Two</DropdownItem>
          </DropdownList>
        </NavbarDropdown>
      </NavbarGroup>
      <NavbarGroup align={NavbarGroup.alignModes.end}>
        <NavbarItem>
          <button type="button" onClick={showCartHandler}>
            Cart {countProductsInCart()}
          </button>
        </NavbarItem>
      </NavbarGroup>
    </Navbar>
  );
}

AppNavbar.propTypes = {
  cartProducts: PropTypes.instanceOf(List),
  showCart: PropTypes.func,
};

const mapStateToProps = (state) => ({
  cartProducts: state.cart,
});

const usedActions = {
  showCart: CartPopupActions.show,
};

export default connect(mapStateToProps, usedActions)(AppNavbar);

// export default AppNavbar;
