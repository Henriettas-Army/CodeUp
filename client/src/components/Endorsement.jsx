import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'react-toolbox/lib/card';

const Endorsement = ({ endorsement }) => (
  <Card style={{ width: '350px' }}>
    <CardTitle
      avatar={endorsement.endorserImg}
      title={endorsement.endorserUsername}
    />
    <CardTitle
      title={endorsement.comments}
      subtitle={endorsement.skills.map(s => s)}
    />
  </Card>
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
