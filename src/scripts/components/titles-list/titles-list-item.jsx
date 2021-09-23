import React from 'react';
import titleProp from '../../../prop-types/title';

function TitlesListItem({ title }) {
  return (
    <div>
      <span>{title.name}</span>
    </div>
  );
}

TitlesListItem.propTypes = {
  title: titleProp,
};

export default TitlesListItem;
