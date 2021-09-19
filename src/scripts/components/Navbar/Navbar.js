import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';

function Navbar({ children }) {
  const [opened, setOpened] = useState(false);
  const toggleNavbar = (e) => {
    e.preventDefault();
    setOpened(!opened);
  };

  const className = `container navbar-inner${opened ? ' shown' : ''}`;

  return (
    <nav className="navbar">
      <div className="navbar-toggle">
        <button
          className="navbar-toggle-btn"
          type="button"
          onClick={toggleNavbar}
        >
          <i className="navbar-toggle-icon">
            <svg
              height="384pt"
              viewBox="0 -53 384 384"
              width="384pt"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
            </svg>
          </i>
        </button>
      </div>
      <div className={className}>{children}</div>
    </nav>
  );
}

Navbar.propTypes = {
  children: PropTypes.node,
};

export default Navbar;
