import React from 'react';
import PropTypes from 'prop-types';

const SearchButton = ({ title, onClick }) => {
  return (
    <span className="input-group-btn">
      <button type="submit" className="btn btn-secondary"  onClick={onClick}>
        {title}
      </button>
    </span>
  );
};

SearchButton.defaultProps = {
    title: 'Search'
};

SearchButton.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default SearchButton;
