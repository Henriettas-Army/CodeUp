import React from 'react';
import PropTypes from 'prop-types';
// import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Spinning from 'grommet/components/icons/Spinning';
import Section from 'grommet/components/Section';

const UserInfo = ({ profile, status, updateProfile, currentUser }) => (
  <Section>
    {status === 'LOADING' &&
      <p className="loading">
        Loading Profile...
        <Spinning />
      </p>
    }
    {status === 'ERROR' && <p className="error">Error loading user profile</p>}
    {status === 'READY' &&
    <Section>
      <Columns
        maxCount={'3'}
        size={'medium'}
        justify={'start'}
      >
        <Box
          align={'center'}
          pad={'medium'}
          margin={'small'}
          colorIndex={'light-1'}
          alignContent={'start'}
        >
          <img src={profile.img} alt="user github profile" style={{ width: '220px' }} />
        </Box>
        <Box
          align={'center'}
          pad={'medium'}
          margin={'small'}
          colorIndex={'light-1'}
        >
          <h3>{profile.username}</h3>
          <h4>{profile.name}</h4>
          <p>{profile.bio}</p>
          <p>{profile.location ? profile.location.join(', ') : ''}</p>
        </Box>
        <Box
          align={'center'}
          pad={'medium'}
          margin={'small'}
          colorIndex={'light-1'}
        >
          <h3>Status: {profile.status}</h3>
        </Box>
      </Columns>
      <Box
        align={'left'}
        pad={'medium'}
        margin={'small'}
        colorIndex={'light-1'}
        textAlign={'left'}
      >
        <p>Technical Skills: {profile.skills ? profile.skills.map(skill => (
          <span>
            <span>{` ${skill} | `}</span>
          </span>
        )) : ' ' }
        </p>
        <p>Learning: {profile.desired ? profile.skills.map(desired => (
          <span>
            <span>{` ${desired} | `}</span>
          </span>
          )) : ' ' }
        </p>
      </Box>
    </Section>
  }
  </Section>
);

UserInfo.propTypes = {
  currentUser: PropTypes.string,
  updateProfile: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    bio: PropTypes.string,
    repos: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.arrayOf(PropTypes.string),
    desired: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

UserInfo.defaultProps = {
  currentUser: '',
};

export default UserInfo;
