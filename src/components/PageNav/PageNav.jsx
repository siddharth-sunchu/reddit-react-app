import React from 'react';
import PropTypes from 'prop-types';

const PageNav = ({ isSuccess, changePrev, changeNext, pageNum }) => {
  if (isSuccess) {
    return (
      <div>
        <div className="d-flex gap-2 m-3 justify-content-center">
          <button className="btn btn-outline-secondary me-md-2" type="button" onClick={changePrev}>
            PREV
          </button>
          <button className="btn btn-outline-secondary" type="button" onClick={changeNext}>
            NEXT
          </button>
        </div>
        <p className="d-flex m-3 justify-content-center">Page {pageNum}</p>
      </div>
    );
  } else {
    return null;
  }
};

PageNav.defaultProps = {
  isSuccess: false,
  pageNum: 1
};

PageNav.propTypes = {
  isLoading: PropTypes.bool,
  changePrev: PropTypes.func.isRequired,
  changeNext: PropTypes.func.isRequired,
  pageNum: PropTypes.number
};

export default PageNav;
