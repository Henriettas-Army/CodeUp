import React from 'react';
import PropTypes from 'prop-types';

const Endorsement = ({ endorsement }) => (
  <div>
    Comments: {endorsement.comments}
  </div>
);

Endorsement.propTypes = {
  endorsement: PropTypes.obj,
};

export default Endorsement;
