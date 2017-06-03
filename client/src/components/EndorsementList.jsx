import React from 'react';
import PropTypes from 'prop-types';
import EndorsementContainer from '../containers/EndorsementContainer';

const EndorsementList = ({ endorsements }) => (
  <div>
    {
      endorsements.map(e => (
        <EndorsementContainer endorsement={e} />
      ))
    }
  </div>
);

EndorsementList.defaultProps = {
  endorsements: [],
}

EndorsementContainer.propTypes = {
  endorsements: PropTypes.array
}
export default EndorsementList;
