import React from 'react';
import { Link } from 'react-router-dom';
import titleProp from '../../../prop-types/title';

function TitlesListItem({ title }) {
  return (
    <Link
      to={`/titles/${title.id}`}
      className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2 border d-flex flex-column align-items-center justify-content-between"
    >
      <img
        className="mw-100"
        src={title.image.original}
        alt={`"${title.name}" poster`}
      />
      <span className="h2 mt-2 text-center">{title.name}</span>
    </Link>
  );
}

TitlesListItem.propTypes = {
  title: titleProp,
};

export default TitlesListItem;
