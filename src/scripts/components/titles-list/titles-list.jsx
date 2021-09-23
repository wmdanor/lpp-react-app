import React, { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import TitlesListItem from './titles-list-item';

const getTitlesPage = async (page) => {
  const API_PAGE_SIZE = 250;
  const PAGE_SIZE = 25;

  const offset = PAGE_SIZE * (page - 1);
  const pageOffset = offset % API_PAGE_SIZE;

  const requestPage = Math.floor(offset / API_PAGE_SIZE);

  try {
    const response = await fetch(
      `https://api.tvmaze.com/shows?page=${requestPage}`,
    );

    const data = await response.json();

    return data.slice(pageOffset, pageOffset + PAGE_SIZE);
  } catch (err) {
    throw new Error(`Error occurred while loading data: "${err.message}"`);
  }
};

const getSearchedPage = async (page, query) => {
  const PAGE_SIZE = 25;

  const offset = PAGE_SIZE * (page - 1);

  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`,
    );

    const data = await response.json();

    const pageData = data.slice(offset, offset + PAGE_SIZE);

    return pageData.map((el) => el.show);
  } catch (err) {
    throw new Error(`Error occurred while loading data: "${err.message}"`);
  }
};

function TitlesList() {
  const [titles, setTitles] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loadingError, setLoadingError] = useState('');

  const loadPage = (newPage) => {
    setPage(newPage);

    if (!query) {
      getTitlesPage(newPage)
        .then((data) => {
          setTitles(data);
          setLoadingError('');
        })
        .catch((err) => {
          setLoadingError(err.message);
        });
    } else {
      getSearchedPage(newPage, query)
        .then((data) => {
          setTitles(data);
          setLoadingError('');
        })
        .catch((err) => {
          setLoadingError(err.message);
        });
    }
  };

  const pageChangeHandler = (e) => {
    e.preventDefault();
    const newPageStr = e.target.value;

    const newPage = Number(newPageStr);
    if (newPage && newPage > 0) {
      loadPage(newPage);
    } else {
      setPage(newPageStr.length === 0 ? undefined : newPage);
    }
  };

  const prevPageHandler = (e) => {
    e.preventDefault();
    loadPage(page - 1);
  };

  const nextPageHandler = (e) => {
    e.preventDefault();
    loadPage(page + 1);
  };

  const queryChangeHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const tryAgainHandler = (e) => {
    e.preventDefault();
    loadPage(page);
  };

  useEffect(() => {
    loadPage(page);
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [query]);

  const renderTitles = () => {
    if (titles.length === 0) {
      return (
        <div className="my-4 d-flex flex-column">
          <span className="text-center w-100">Empty page</span>
        </div>
      );
    }

    return titles.map((title) => (
      <TitlesListItem key={title.id} title={title} />
    ));
  };

  return (
    <div>
      <div className="d-flex mb-2">
        <Input
          className="me-2"
          type="text"
          placeholder="Search"
          onChange={queryChangeHandler}
          value={query}
        />
      </div>
      <div>
        {!loadingError ? (
          renderTitles()
        ) : (
          <div className="my-4 d-flex flex-column">
            <span className="text-center text-danger w-100">
              Error occurred while page: &quot;{loadingError}&quot;
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
      <div className="d-flex align-items-center justify-content-center p-3">
        <Button
          className="flex-grow-1"
          disabled={page === 1}
          onClick={prevPageHandler}
        >
          Previous
        </Button>
        <Input
          className="w-auto mx-3 flex-grow-1 text-center"
          type="number"
          onChange={pageChangeHandler}
          value={page}
        />
        <Button className="flex-grow-1" onClick={nextPageHandler}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default TitlesList;
