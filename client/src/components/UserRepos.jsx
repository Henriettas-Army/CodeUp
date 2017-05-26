import React from 'react';
import PropTypes from 'prop-types';
import Spinning from 'grommet/components/icons/Spinning';
// import Box from 'grommet/components//Box';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Section from 'grommet/components/Section';
// import StarIcon from 'grommet/components/icons/base/Star';

const UserRepos = ({ repos, status, user }) => (
  // <Box
  //   align={'center'}
  //   pad={'medium'}
  //   margin={'small'}
  //   colorIndex={'neutral-1'}
  // >
  <Section>
    {status === 'LOADING' &&
      <p className="loading">
        Loading Repos...
        <Spinning />
      </p>
    }
    {status === 'ERROR' && <p className="error">Error loading user profile</p>}
    {status === 'READY' &&
      <div>
        <h3>{repos && JSON.parse(repos[0]).stargazers_count > 0 ? 'Top Four Starred Repos' : 'Most Recently Pushed Repos'}</h3>

        <Tiles
          fill={false}
          flush={false}
          // onMore={...}
          selectable
          size={'small'}
          // onSelect={...}
        >
          {repos ? repos.map(repo => (
            <Tile>
              <a href={`https://github.com/${user}/${repo.name}`} >
                <Card
                  heading={`${JSON.parse(repo).name}${JSON.parse(repo).stargazers_count > 0 ? `\nStars: ${JSON.parse(repo).stargazers_count}` : ''}`}
                  description={`${JSON.parse(repo).language ? JSON.parse(repo).language : ''}\n${JSON.parse(repo).description ? `~~${JSON.parse(repo).description}` : ''}`}
                />
              </a>
            </Tile>
          )) : ' ' }
        </Tiles>
      </div>
    }
  </Section>
);

UserRepos.propTypes = {
  status: PropTypes.string.isRequired,
  repos: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.string,
};

UserRepos.defaultProps = {
  repos: undefined,
  user: '',
};

export default UserRepos;
