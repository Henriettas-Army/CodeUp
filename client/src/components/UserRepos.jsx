/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import Spinning from 'grommet/components/icons/Spinning';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import StarIcon from 'grommet/components/icons/base/Star';

const UserRepos = ({ repos, status, user }) => (
  <div className="user-container">
    {status === 'LOADING' && <p className="loading">Loading Repos...<Spinning /></p>}
    {status === 'ERROR' && <p className="error">Error loading user profile</p>}
    {status === 'READY' &&
      <div className="repos-container">
        <h2 className="header-margin">{repos && repos.length > 0 && repos[0].stargazers_count > 0 ? 'Top Four Starred Repos' : 'Most Recently Pushed Repos'}</h2>
        <Tiles fill flush={false} size={'small'} >
          {repos && repos.length > 0 ? repos.map(repo => (
            <Tile
              className="repo-tile"
              key={Math.random()}
              onClick={() => { window.open(`https://github.com/${user}/${repo.name}`); }}
            >
              <Card
                heading={<h3 className="header-margin"><strong>{repo.name}</strong></h3>}
                size={'medium'}
                description={<span className="description">
                  {repo.stargazers_count > 0 ?
                    <span>{repo.stargazers_count } <StarIcon /></span>
                    : ''}<br />
                  {repo.language ? (<strong><i>{repo.language}</i></strong>) : ''}<br />
                  {repo.description ? repo.description : 'Description N/A'}
                </span>}
              />
            </Tile>
          )) : 'No repos' }
        </Tiles>
      </div>
    }
  </div>
);

UserRepos.propTypes = {
  status: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.string,
};

UserRepos.defaultProps = {
  repos: undefined,
  user: '',
};

export default UserRepos;
