import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import loggedUserProp from '../../prop-types/loggedUser';

const getTitleById = async (id) => {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  return response.json();
};

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser.user,
  };
}

function Title({ loggedUser }) {
  const { id } = useParams();
  const [title, setTitle] = useState(undefined);
  const [loadingError, setLoadingError] = useState('');

  const loadTitle = () => {
    getTitleById(Number(id))
      .then((data) => {
        setLoadingError('');
        setTitle(data);
      })
      .catch((err) => setLoadingError(err.message));
  };

  const addToFavorites = () => {};
  const rateTitle = () => {};

  const tryAgainHandler = (e) => {
    e.preventDefault();
    loadTitle(id);
  };

  useEffect(() => loadTitle(), []);

  return (
    <div className="container py-4 px-5 shadow">
      <div>
        {!loadingError && title && (
          <>
            <div className="row">
              <div className="col-12 col-sm-3 d-flex justify-content-center justify-content-sm-start">
                <img
                  className="mw-100"
                  src={title.image.original}
                  alt={`"${title.name}" poster`}
                />
              </div>
              <div className="col-12 col-sm-3 offset-sm-6 mt-3 mt-sm-0">
                <div className="d-flex flex-column align-items-center align-items-sm-end">
                  <h2>{title.name}</h2>
                  <span>{title.language}</span>
                  <span>{title.summary.slice(3, -4)}</span>
                </div>
              </div>
            </div>
          </>
        )}
        {!loadingError && !title && (
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
    </div>
  );
}

Title.propTypes = {
  loggedUser: loggedUserProp,
};

export default connect(mapStateToProps)(Title);
