import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitlesListItem from '../../components/titles-list/titles-list-item';

const getFavorites = async (userId) => {
  if (userId === 0) {
    throw new Error('Test error');
  }

  const response = await fetch('https://api.tvmaze.com/shows?page=0');

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(`${response.status}, ${data.name}`);
  }

  return data.slice(3, 11);

  // Normal implementation
  // const response = await fetch(`/api/users/${userId}/favorites`);
  // const data = await response.json();
  //
  // if (response.status !== 200) {
  //   throw new Error(`${response.status}`);
  // }
  //
  // return data;
};

const Favorites = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [loadingError, setLoadingError] = useState('');

  const loadFavorites = () => {
    getFavorites(Number(id))
      .then((data) => {
        setFavorites(data);
        setLoadingError('');
      })
      .catch((err) => {
        setLoadingError(err.message);
      });
  };

  const tryAgainHandler = (e) => {
    e.preventDefault();
    loadFavorites();
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const renderFavorites = () => {
    if (favorites.length === 0) {
      return (
        <div className="my-4 d-flex flex-column">
          <span className="text-center w-100">No favorites</span>
        </div>
      );
    }

    return (
      <div className="row">
        {favorites.map((title) => (
          <TitlesListItem key={title.id} title={title} />
        ))}
      </div>
    );
  };

  return (
    <div className="container py-3 px-5 shadow">
      <div>
        {!loadingError ? (
          renderFavorites()
        ) : (
          <div className="my-4 d-flex flex-column">
            <span className="text-center text-danger w-100">
              Error occurred while loading page: &quot;{loadingError}&quot;
            </span>
            <button
              type="button"
              className="btn btn-link shadow-none mt-2"
              onClick={tryAgainHandler}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
