import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import loggedUserProp from '../../prop-types/loggedUser';
import omegalulImage from '../../../images/omegalul.png';

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser.user,
  };
}

const getUserById = async (id) => {
  if (id === 0) {
    throw new Error('Test error');
  }

  const promise = new Promise((resolve) => setTimeout(resolve, 500));
  await promise;

  return {
    id,
    email: 'example@email.com',
    username: 'example',
    age: 20,
  };
};

const Index = ({ loggedUser }) => {
  const { id } = useParams();

  const [user, setUser] = useState(undefined);
  const [loadingError, setLoadingError] = useState('');

  const loadProfile = () => {
    getUserById(Number(id))
      .then((data) => {
        setLoadingError('');
        setUser(data);
      })
      .catch((err) => setLoadingError(err.message));
  };

  const tryAgainHandler = (e) => {
    e.preventDefault();
    loadProfile(id);
  };

  useEffect(() => {
    loadProfile(id);
  }, []);

  const isLoggedUserProfile = user && loggedUser && user.id === loggedUser.id;

  return (
    <div className="container py-4 px-5 shadow">
      {!loadingError && user && (
        <>
          {isLoggedUserProfile && <h2>Your profile</h2>}
          <div className="row">
            <div className="col-12 col-sm-3 d-flex justify-content-center justify-content-sm-start">
              <img src={omegalulImage} alt="Omegalul meme" />
            </div>
            <div className="col-12 col-sm-3 offset-sm-6 mt-3 mt-sm-0">
              <div className="d-flex flex-column align-items-center align-items-sm-end">
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{user.age}</span>
              </div>
            </div>
          </div>
        </>
      )}
      {!loadingError && !user && (
        <div className="my-4 d-flex">
          <span className="text-center w-100">Loading...</span>
        </div>
      )}
      {loadingError && (
        <div className="my-4 d-flex flex-column align-center">
          <span className="text-center text-danger w-100">
            Error occurred while loading title: &quot;{loadingError}&quot;
          </span>
          <button
            type="button"
            className="btn btn-link shadow-none"
            onClick={tryAgainHandler}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

Index.propTypes = {
  loggedUser: loggedUserProp,
};

export default connect(mapStateToProps)(Index);
