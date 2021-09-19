import * as React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import logoUrl from '../../../images/logo.png';

function Footer() {
  return (
    <>
      <footer>
        <div className="fluid-container footer-top-part">
          <div className="container top-footer-content">
            <div className="top-footer-content-text">
              <h6>Need more information?</h6>
              <p>Reach out to us!</p>
            </div>
            <Link className="button button-gray footer-button" to="/contacts">
              Contact me
            </Link>
          </div>
        </div>
        <div className="fluid-container footer-bottom-part">
          <div className="container bottom-footer-content">
            <div className="footer-company">
              <img src={logoUrl} alt="FeProject footer logo" />
            </div>

            <div className="footer-nav">
              <div className="footer-nav-table">
                <h5 className="footer-nav-word">Pages</h5>
                <div className="footer-nav-col">
                  <Link to="/">Home</Link>
                  <Link to="/contacts">Contacts</Link>
                  <Link to="/about">About</Link>
                </div>
              </div>
            </div>
            <div className="footer-contacts">
              <h5 className="footer-contacts-word">Contacts</h5>
              <div className="footer-contacts-row">
                <a href="tel:380998887766">+38 0998887766</a>
              </div>
              <div className="footer-contacts-row">
                <a href="mailto:example@gmail.com">example@gmail.com</a>
              </div>
              <div className="footer-contacts-row">
                <a href="https://goo.gl/maps/8ZxfXsiUqJ6XsRqu5">
                  Route de Crassier 19, CH – 1262, Eysins
                </a>
              </div>
            </div>
          </div>
          <p className="rights">FeProject – All rights reserved (c) 2021 </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
