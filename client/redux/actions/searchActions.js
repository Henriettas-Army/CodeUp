const SEARCH = 'SEARCH';

const search = query => ({ type: SEARCH, query });

module.exports = {
  SEARCH,
  search,
};
