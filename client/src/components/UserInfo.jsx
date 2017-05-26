import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ profile, status }) => (
  <div>
    {/* change to loading component*/}
    {status === 'LOADING' && <p className="loading">Loading Profile...</p>}
    {status === 'ERROR' && <p className="error">Error loading user profile</p>}
    {status === 'READY' &&
      <div>
        Info
        <h1>Username: {profile.username}</h1>
        <h2>Name: {profile.name}</h2>
        <h3>Status: {profile.status}</h3>
        <h4>Location: {profile.location ? profile.location.join(', ') : ''}</h4>
        <p>Technical Skills: {profile.skills ? profile.skills.map(skill => (
          <span>
            <span>{` ${skill} | `}</span>
          </span>
        )) : ' ' } </p>
        <p>Learning: {profile.desired ? profile.skills.map(desired => (
          <span>
            <span>{` ${desired} | `}</span>
          </span>
        )) : ' ' } </p>
      </div>
    }
  </div>
);

UserInfo.propTypes = {
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

export default UserInfo;
