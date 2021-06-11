import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ children, ...rest }) => {
    return (
        <div className="input-group pt-1 pb-1">
            <input
                className="form-control me-3"
                {...rest}
                placeholder="Search for a SubReddit"
            />
            {children}
        </div>
    )
};
  
SearchInput.propTypes = {
    children: PropTypes.node.isRequired
};

export default SearchInput;


