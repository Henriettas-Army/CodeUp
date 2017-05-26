import React from 'react';
import PropTypes from 'prop-types';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Spinning from 'grommet/components/icons/Spinning';


const UserInfo = ({ profile, status, updateProfile, currentUser }) => (
  <Box
    align={'center'}
    pad={'medium'}
    margin={'small'}
    colorIndex={'neutral-1'}
    appCentered
    full
  >
    {status === 'LOADING' &&
      <p className="loading">
        Loading Profile...
        <Spinning />
      </p>
    }
    {status === 'ERROR' && <p className="error">Error loading user profile</p>}
    {status === 'READY' &&
    <Box
      direction='row'
    >
    <Columns maxCount='3'
      size='medium'
      justify='start'
    >
      <Box align='center'
        pad='medium'
        margin='small'
        colorIndex='light-2'
        alignContent='start'
        // full={'vertical'}
      >
        <img src={profile.img} alt="user github profile" style={{ width: '220px' }} />
        Box 1
      </Box>
      <Box align='center'
        pad='medium'
        margin='small'
        colorIndex='light-2'>
        Box 2
        <h4>{profile.username}</h4>
        <h5>{profile.name}</h5>
        <p>{profile.bio}</p>
        <h4>{profile.location ? profile.location.join(', ') : ''}</h4>
      </Box>
      <Box align='center'
        pad='medium'
        margin='small'
        colorIndex='light-2'>
        Box 3
        <h3>Status: {profile.status}</h3>
      </Box>
      {/* <Box align='center'
        pad='medium'
        margin='small'
        colorIndex='light-2'>
        Box 5
      </Box>
      <Box align='center'
        pad='medium'
        margin='small'
        colorIndex='light-2'>
        Box 6
      </Box> */}
    </Columns>
    <Box align='center'
      pad='medium'
      margin='small'
      colorIndex='light-2'>
      Box 4
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
</Box>
    }
    {/* // <Split
      //   separator={false}
      //   fixed={false}
      //   flex={'left'}
      //   priority={'left'}
      //   showOnResponsive={'both'}
      // >
      //   <Box
      //     colorIndex={'neutral-1'}
      //     justify={'left'}
      //     align={'left'}
      //     alignSelf={'center'}
      //     pad={'none'}
      //   >
      //     <Columns
      //       maxCount={3}
      //       size={'medium'}
      //       responsive={false}
      //       masonry
      //     >
      //       <Box
      //         align={'left'}
      //         margin={'small'}
      //       >
      //         <img src={profile.img} alt="user github profile" style={{ width: '220px' }} />
      //       </Box>
      //       <Box
      //         align={'left'}
      //         basis={'small'}
      //         margin={'small'}
      //       >
      //         <h4>{profile.username}</h4>
      //         <h5>{profile.name}</h5>
      //         <p>{profile.bio}</p>
      //         <h4>{profile.location ? profile.location.join(', ') : ''}</h4>
      //       </Box>
      //       <Box
      //         colorIndex={'neutral-2'}
      //         justify={'left'}
      //         align={'left'}
      //         pad={'none'}
      //         >
      //           <h3>Status: {profile.status}</h3>
      //         </Box>
      //     </Columns>
      //     <Box
      //       align={'left'}
      //       basis={'small'}
      //       margin={'small'}
      //     >
      //       <p>Technical Skills: {profile.skills ? profile.skills.map(skill => (
      //         <span>
      //           <span>{` ${skill} | `}</span>
      //         </span>
      //         )) : ' ' }
      //       </p>
      //       <p>Learning: {profile.desired ? profile.skills.map(desired => (
      //         <span>
      //           <span>{` ${desired} | `}</span>
      //         </span>
      //         )) : ' ' }
      //       </p>
      //     </Box>
      //   </Box>
      // </Split> */}
  </Box>
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
