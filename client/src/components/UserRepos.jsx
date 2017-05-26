import React from 'react';
import PropTypes from 'prop-types';

const UserRepos = ({ repos, status }) => (
  <div>
    {/* change to loading component*/}
    {status === 'LOADING' && <p className="loading">Loading Profile...</p>}
    {status === 'ERROR' && <p className="error">Error loading user profile</p>}
    {status === 'READY' &&
      <div>
        {repos && JSON.parse(repos[0]).stargazers_count > 0 ? 'Top Four Starred Repos' : 'Most Recently Pushed Repos'}
        <div>
          {repos ? repos.map(repo => (
            <div>
              <h3>{JSON.parse(repo).name}</h3>
              <p>{JSON.parse(repo).description !== null ? JSON.parse(repo).description : ' '}</p>
              <p>{JSON.parse(repo).language}</p>
            </div>
          )) : ' ' }
        </div>
      </div>
    }
  </div>
);

UserRepos.propTypes = {
  status: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(PropTypes.string),
};

UserRepos.defaultProps = {
  repos: undefined,
};

export default UserRepos;
