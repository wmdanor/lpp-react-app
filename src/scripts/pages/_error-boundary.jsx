import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

    this.props.history.listen(() => {
      this.setState({
        hasError: false,
      });
    });
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  reloadPage() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-3 px-5 shadow">
          <div className="my-4 d-flex flex-column align-center">
            <span className="text-center text-danger w-100">
              Error occurred while loading page
            </span>
            <button
              type="button"
              className="btn btn-link shadow-none"
              onClick={this.reloadPage}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object,
};

export default withRouter(ErrorBoundary);
