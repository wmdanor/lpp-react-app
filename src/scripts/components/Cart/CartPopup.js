import PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { CartPopupActions } from '../../actions';
import AppCart from '../App/AppCart';
import './CartPopup.scss';

class CartPopup extends React.Component {
  constructor(props) {
    super(props);

    this.hidePopupHandler = (e) => {
      e.preventDefault();
      this.props.hidePopup();
    };

    this.wrapperRef = React.createRef();

    this.handleClickOutside = (e) => {
      if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
        this.props.hidePopup();
      }
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setBodyScroll() {
    const { isShown } = this.props;
    const body = document.querySelector('body');
    if (isShown) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
  }

  render() {
    const { isShown, hidePopup } = this.props;
    this.setBodyScroll();

    const shownClass = isShown ? ' shown' : '';

    return (
      <div className={`cart-popup-wrapper${shownClass}`}>
        <div className="cart-popup" ref={this.wrapperRef}>
          <div className="cart-popup-header">
            <h2>Shopping cart</h2>
            <button type="button" onClick={this.hidePopupHandler}>
              &times;
            </button>
          </div>
          <div className="cart-popup-content">
            <div>
              <AppCart hidePopup={hidePopup} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CartPopup.propTypes = {
  isShown: PropTypes.bool,
  hidePopup: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isShown: state.cartPopup.get('shown'),
});

const usedActions = {
  hidePopup: CartPopupActions.hide,
};

export default connect(mapStateToProps, usedActions)(CartPopup);
