import React from 'react';
import PropTypes from 'prop-types';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Spinning from 'grommet/components/icons/Spinning';
import Edit from 'grommet/components/icons/base/Edit';
import Section from 'grommet/components/Section';
import Image from 'grommet/components/Image';
import Split from 'grommet/components/Split';
import UserStatus from './UserStatus';

const UserInfo = ({ profile, status, updateProfile, currentUser, editing, editProfile }) => (
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
        maxCount={3}
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

          <Image src={profile.img} alt="user github avatar" size={'small'} />
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
          {profile.username === 'techmexdev' ?
            <UserStatus
              user={profile.username}
              updateProfile={updateProfile}
              status={profile.status}
            />
            : <h4>Status: {profile.status}</h4>
          }
        </Box>
      </Columns>
      <Split
        priority={'left'}
        flex={'left'}
        showOnResponsive={'both'}
      >
        <Box
          align={'start'}
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
        <Box
          align={'start'}
          pad={'medium'}
          margin={'small'}
          colorIndex={'light-1'}
          textAlign={'left'}
        >
          <Button
            icon={<Edit />}
            onClick={editProfile}
            plain
            critical={false}
            accent={false}
            secondary={false}
            primary={false}
            hoverIndicator={{ background: 'light-2' }}
            size={'small'}
          />
        </Box>
      </Split>
    </Section>
  }
  </Section>
);

UserInfo.propTypes = {
  currentUser: PropTypes.string,
  updateProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
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
