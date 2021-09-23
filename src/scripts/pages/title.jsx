import React from 'react';
import { connect } from 'react-redux';
import loggedUserProp from '../../../prop-types/loggedUser';

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser.user,
  };
}

function Title({ loggedUser }) {
  const addToFavorites = () => {};
  const rateTitle = () => {};

  return <div></div>;
}

Title.propTypes = {
  loggedUser: loggedUserProp,
};

export default connect(mapStateToProps)(Title);
