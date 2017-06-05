import React from 'react';
import PropTypes from 'prop-types';
import EndorsementContainer from '../containers/EndorsementContainer';

const EndorsementList = ({ endorsements }) => (
  <div>
    {
      endorsements.map(e => (
        <EndorsementContainer endorsement={e} key={Math.random()} />
      ))
    }
  </div>
);

EndorsementList.propTypes = {
  endorsements: PropTypes.arrayOf(
    PropTypes.shape({
      endorserUsername: PropTypes.string.isRequired,
      endorserImg: PropTypes.string.isRequired,
      comments: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  )
};

EndorsementList.defaultProps = {
  endorsements: [],
};

export default EndorsementList;
