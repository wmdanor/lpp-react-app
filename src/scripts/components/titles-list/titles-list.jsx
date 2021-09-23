import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'reactstrap';
import TitlesListItem from './titles-list-item';

const getTitlesPage = async (page) => {
  const API_PAGE_SIZE = 250;
  const PAGE_SIZE = 25;

  const offset = PAGE_SIZE * (page - 1);
  const pageOffset = offset % API_PAGE_SIZE;

  const requestPage = Math.floor(offset / API_PAGE_SIZE);

  const response = await fetch(
    `https://api.tvmaze.com/shows?page=${requestPage}`,
  );

  const data = await response.json();

  return data.slice(pageOffset, pageOffset + PAGE_SIZE);
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

  const scrollRef = useRef();

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
    scrollRef.current.scrollIntoView();
    loadPage(page - 1);
  };

  const nextPageHandler = (e) => {
    e.preventDefault();
    scrollRef.current.scrollIntoView();
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

    return (
      <div className="row">
        {titles.map((title) => (
          <TitlesListItem key={title.id} title={title} />
        ))}
      </div>
    );
  };

  const renderPaginator = () => (
    <div className="row py-3">
      <Button
        className="col-12 col-sm-4"
        disabled={page === 1}
        onClick={prevPageHandler}
      >
        Previous
      </Button>
      <div className="col-12 col-sm-4 py-1 py-sm-0 px-0 px-sm-2 px-lg-3">
        <Input
          className="text-center"
          type="number"
          onChange={pageChangeHandler}
          value={page}
        />
      </div>
      <Button className="col-12 col-sm-4" onClick={nextPageHandler}>
        Next
      </Button>
    </div>
  );

  return (
    <div ref={scrollRef}>
      {renderPaginator()}
      <div className="row mb-2">
        <Input
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
      {renderPaginator()}
    </div>
  );
}

export default TitlesList;
