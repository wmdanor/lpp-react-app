import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser.user,
  };
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default connect(mapStateToProps)(Home);
