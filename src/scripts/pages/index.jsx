import React from 'react';
import { connect } from 'react-redux';
import TitlesList from '../components/titles-list/titles-list';

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser.user,
  };
}

function Home() {
  return (
    <div className="container py-3 px-5 shadow">
      <TitlesList />
    </div>
  );
}

export default connect(mapStateToProps)(Home);
