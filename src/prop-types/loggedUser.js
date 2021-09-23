import PropTypes from 'prop-types';

const loggedUserProp = PropTypes.shape({
  id: PropTypes.number,
  email: PropTypes.string,
  user: PropTypes.string,
  age: PropTypes.number,
});

export default loggedUserProp;
