import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Spinning from 'grommet/components/icons/Spinning';
import Section from 'grommet/components/Section';
import Image from 'grommet/components/Image';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import Label from 'grommet/components/Label';
import UserStatus from './UserStatus';
import TechEditForm from './TechEditForm';

const UserInfo = ({ profile, status, updateProfile, currentUser, editing, editProfile }) => (
  <Section>
    {status === 'LOADING' && <p className="loading">Loading Profile... <Spinning /></p>}
    {status === 'ERROR' && <p className="error">Error loading user profile</p>}
    {status === 'READY' &&
    <Section>
      <Columns maxCount={3} size={'medium'} justify={'start'} >
        <Box align={'center'} pad={'medium'} margin={'small'} colorIndex={'light-1'} alignContent={'start'} >
          <Image src={profile.img} alt="user github avatar" size={'small'} />
        </Box>
        <Box align={'center'} pad={'medium'} margin={'small'} colorIndex={'light-1'} >
          <h3>{profile.username}</h3>
          <h4>{profile.name}</h4>
          <p>{profile.bio}</p>
          <p>{profile.location ? profile.location.join(', ') : ''}</p>
        </Box>
        <Box align={'center'} pad={'medium'} margin={'small'} colorIndex={'light-1'} >
          {profile.username === currentUser ?
            <UserStatus
              user={profile.username}
              updateProfile={updateProfile}
              status={profile.status}
            />
            : <h4>Status: <br /> {profile.status}</h4>
          }
        </Box>
      </Columns>
      <Columns maxCount={3} size={'medium'} justify={'start'} >
        <Box align={'start'} pad={'medium'} margin={'small'} colorIndex={'light-1'} textAlign={'left'} flex full={false} >
          <p>
            <Label>Technical Skills: </Label><br />
            {profile.skills && profile.skills.length > 0 ? profile.skills.map((skill, key) => (
              <span key={+key + 1} > {key > 0 ? `, ${skill}` : skill }</span>
            )) : 'N/A' }
          </p>
          <p>
            <Label> Skills in Development: </Label><br />
            {profile.desired && profile.desired.length > 0 ? profile.desired.map((desired, key) => (
              <span key={+key + 1}>{key > 0 ? `, ${desired}` : desired }</span>
            )) : 'N/A' }
          </p>
        </Box>
        <Box align={'center'} pad={'medium'} margin={'small'} colorIndex={'light-1'} >
          <Section>
            { profile.username === currentUser ?
              <TechEditForm
                user={currentUser}
                updateProfile={updateProfile}
                skills={profile.skills}
                desired={profile.desired}
                location={profile.location}
                editProfile={editProfile}
                editing={editing}
              />
            : ''}
          </Section>
        </Box>
        <Box align={'start'} pad={'medium'} margin={'small'} colorIndex={'light-1'} textAlign={'left'} flex full={false} >
          {profile.meter ?
            <AnnotatedMeter
              type="circle"
              units={'bytes'}
              series={profile.meter.sort((a, b) => b.value - a.value).slice(0, 8)}
              legend
            /> : ''}
        </Box>
      </Columns>
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
    meter: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
};

UserInfo.defaultProps = {
  currentUser: '',
};

export default UserInfo;
