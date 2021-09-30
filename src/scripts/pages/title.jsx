import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import loggedUserProp from '../prop-types/loggedUser';

// const getAuthToken = () => '';

const getTitleById = async (id) => {
  if (id === 0) {
    return {
      id: 0,
      name: 'Example',
      language: 'Language',
      summary: 'Lul',
      image: {
        original: '',
      },
    };
  }

  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);

  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(`${response.status}, ${data.name}`);
  }

  return data;
};

const setFavoriteStatus = async (userId, titleId, status) => {
  if (userId === 0 || titleId === 0 || status === 0) {
    throw new Error('Favorite status test error');
  }

  return {};

  // Normal implementation
  // const response = await fetch(`/api/users/${userId}/favorites`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: getAuthToken(),
  //   },
  //   body: JSON.stringify({
  //     titleId,
  //     status,
  //   }),
  // });
  //
  // const data = await response.json();
  //
  // if (response.status !== 200) {
  //   throw new Error(`${data.error}`);
  // }
  //
  // return data;
};

const getFavoriteStatus = async (userId, titleId) => {
  if (titleId === 0 || userId === 0) {
    return true;
  }

  return false;

  // Normal implementation
  // const response = await fetch(`/api/users/${userId}/favorites/${titleId}`);
  //
  // const data = await response.json();
  //
  // if (response.status !== 200) {
  //   throw new Error(`${data.error}`);
  // }
  //
  // return data.value;
};

const setTitleRateStatus = async (userId, titleId, status) => {
  if (userId === 0 || titleId === 0 || status === 0) {
    throw new Error('Rate status test error');
  }

  return {};

  // Normal implementation
  // const response = await fetch(`/api/titles/${titleId}/rate`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: getAuthToken(),
  //   },
  //   body: JSON.stringify({
  //     userId,
  //     status,
  //   }),
  // });
  //
  // const data = await response.json();
  //
  // if (response.status !== 200) {
  //   throw new Error(`${data.error}`);
  // }
  //
  // return data;
};

const getRateStatus = async (userId, titleId) => {
  if (titleId === 0 || userId === 0) {
    return true;
  }

  return false;

  // Normal implementation
  // const response = await fetch(`/api/titles/${titleId}/rating/${userId}`);
  //
  // const data = await response.json();
  //
  // if (response.status !== 200) {
  //   throw new Error(`${data.error}`);
  // }
  //
  // return data.value;
};

function mapStateToProps(state) {
  return {
    loggedUser: state.loggedUser.user,
  };
}

function Title({ loggedUser }) {
  let { id } = useParams();
  id = Number(id);
  const [title, setTitle] = useState(undefined);
  const [loadingError, setLoadingError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const loadTitle = () => {
    if (!loggedUser) {
      getTitleById(id)
        .then((data) => {
          setLoadingError('');
          setTitle(data);
        })
        .catch((err) => setLoadingError(err.message));
    } else {
      Promise.all([
        getTitleById(id),
        getFavoriteStatus(loggedUser.id, id),
        getRateStatus(loggedUser.id, id),
      ])
        .then((data) => {
          setLoadingError('');
          setTitle(data[0]);
          setIsFavorite(data[1]);
          setIsLiked(data[2]);
        })
        .catch((err) => setLoadingError(err.message));
    }
  };

  const setFavorite = () => {
    setFavoriteStatus(loggedUser.id, id, !isFavorite).catch((err) =>
      setLoadingError(err.message),
    );
    setIsFavorite(!isFavorite);
  };

  const setRate = () => {
    setTitleRateStatus(loggedUser.id, id, !isLiked).catch((err) =>
      setLoadingError(err.message),
    );
    setIsLiked(!isLiked);
  };

  const favoriteHandler = (e) => {
    e.preventDefault();
    setFavorite();
  };

  const likeHandler = (e) => {
    e.preventDefault();
    setRate();
  };

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
                  {loggedUser && (
                    <div className="mt-2 d-flex">
                      <Button className="me-2" onClick={favoriteHandler}>
                        {isFavorite ? 'Unfavorite' : 'Favorite'}
                      </Button>
                      <Button onClick={likeHandler}>
                        {isLiked ? 'Unlike' : 'Like'}
                      </Button>
                    </div>
                  )}
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
