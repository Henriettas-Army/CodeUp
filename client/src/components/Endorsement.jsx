import React from 'react';
import PropTypes from 'prop-types';
import Card from 'grommet/components/Card';
import Chip from 'react-toolbox/lib/chip';

const Endorsement = ({ endorsement }) => (
  <Card
    size="medium"
    pad="none"
    heading={(
      <span>
        <img className="endorse-img" src={endorsement.endorserImg} alt="endorser" />
        <strong>{`  ${endorsement.endorserUsername}`}</strong>
        <br />
        <br />
        <span className="endorse-title"><strong>{endorsement.title}</strong></span>
      </span>
    )}
    description={(
      <div>
        <span className="description">{endorsement.comments}</span><br />
        {endorsement.skills.map(s => (
          <Chip key={s} style={{ display: 'inline-block', backgroundColor: '#2E8C65', color: '#fff' }}>{s}</Chip>
        ))}
      </div>
    )}
  />
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
