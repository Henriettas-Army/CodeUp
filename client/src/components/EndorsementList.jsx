import React from 'react';
import PropTypes from 'prop-types';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Endorsement from '../components/Endorsement';

const EndorsementList = ({ endorsements }) => (
  <div className="endorsement-container">
    <h2 className="header-margin">{endorsements && endorsements.length > 0 ? 'Endorsements' : ''}</h2>
    <Tiles fill flush={false} size="small" >
      {
        endorsements.map(e => (
          <Tile
            className="endorsement-card"
            key={Math.random()}
          >
            <Endorsement endorsement={e} key={Math.random()} />
            <br />
          </Tile>
        ))
      }
    </Tiles>
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
