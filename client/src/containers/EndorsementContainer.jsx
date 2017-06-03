import React from 'react';
import PropTypes from 'prop-types';
import Endorsement from '../components/Endorsement';

const EndorsementContainer = ({ endorsement }) => (
  <Endorsement endorsement={endorsement} />
);

EndorsementContainer.propTypes = {
  endorsement: PropTypes.shape({
    endorserUsername: PropTypes.string,
    endorserImg: PropTypes.string,
    comments: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string)
  }),
};

EndorsementContainer.defaultProps = {
  endorsement: {},
};

export default EndorsementContainer;
