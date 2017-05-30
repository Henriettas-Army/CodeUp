import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search } from '../../redux/actions/searchActions';
import Search from '../components/Search';

const SearchContainer = props => (<Search {...props} />);

const mapDispatchToProps = dispatch => ({ search: (query) => { dispatch(search(query)); } });

SearchContainer.propTypes = {
  search: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(SearchContainer);
