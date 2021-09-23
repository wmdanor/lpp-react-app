import PropTypes from 'prop-types';

const titleProp = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.shape({
    medium: PropTypes.string,
    original: PropTypes.string,
  }),
});

export default titleProp;
