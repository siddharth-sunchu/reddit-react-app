import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ isLoading, children }) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className="d-flex justify-content-center m-3">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

// import PropTypes from 'prop-types';

Loader.defaultProps = {
  isLoading: false
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Loader;
