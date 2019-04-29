import PropTypes from 'prop-types';

export const todoItemType = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
  isComplete: PropTypes.bool,
});

export const filterType = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});
