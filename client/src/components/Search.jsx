import React from 'react';
import PropTypes from 'prop-types';
import GSearch from 'grommet/components/Search';

const Search = (props) => {
  const handleInputChange = (e) => {
    props.search(e.target.value);
  };

  return (
    <GSearch
      size="medium"
      fill
      placeHolder="Search"
      inline
      onDOMChange={(e) => { handleInputChange(e); }}
    />
  );
};

Search.propTypes = {
  search: PropTypes.func.isRequired,
};

export default Search;
