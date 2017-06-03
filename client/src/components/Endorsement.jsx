import React from 'react';
import PropTypes from 'prop-types';

const Endorsement = ({ endorsement }) => (
  <div>
    Comments: {endorsement.comments}
  </div>
);

Endorsement.propTypes = {
  endorsement: PropTypes.shape({
    endorserUsername: PropTypes.string.isRequired,
    endorserImg: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Endorsement;
