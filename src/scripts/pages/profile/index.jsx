import React from 'react';
import { connect } from 'react-redux';
import loggedUserProp from '../../../prop-types/loggedUser';

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser.user,
  };
}

const Index = ({ loggedUser }) => (
  <div className="container py-3 px-5 shadow">
    <div className="row">
      <div className="col-12 col-sm-3 d-flex justify-content-center justify-content-sm-start">
        <img src="/images/omegalul.png" alt="Omegalul meme" />
      </div>
    </div>
    <div className="col-12 col-sm-3 offset-sm-6">
      <div className="d-flex flex-column align-items-center align-items-sm-end">
        {loggedUser && (
          <>
            <span>{loggedUser.username}</span>
            <span>{loggedUser.email}</span>
            <span>{loggedUser.age}</span>
          </>
        )}
      </div>
    </div>
  </div>
);

Index.propTypes = {
  loggedUser: loggedUserProp,
};

export default connect(mapStateToProps)(Index);
