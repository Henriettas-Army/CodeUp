/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GSearch from 'grommet/components/Search';

class Search extends Component {
  handleInputChange(e) {
    this.props.search(e.target.value);
    if (window.location.pathname !== '/explore') {
      window.location.href = '/explore';
    }
  }

  render() {
    return (
      <GSearch
        value={this.props.searchQuery}
        size="medium"
        fill
        placeHolder="Search"
        inline
        onDOMChange={(e) => { this.handleInputChange(e); }}
      />
    );
  }
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Search;
