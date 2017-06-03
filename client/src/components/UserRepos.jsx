import React from 'react';
import PropTypes from 'prop-types';
import Spinning from 'grommet/components/icons/Spinning';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Anchor from 'grommet/components/Anchor';
import StarIcon from 'grommet/components/icons/base/Star';

const UserRepos = ({ repos, status, user }) => (
  <Section>
    {status === 'LOADING' && <p className="loading">Loading Repos...<Spinning /></p>}
    {status === 'ERROR' && <p className="error">Error loading user profile</p>}
    {status === 'READY' &&
      <article>
        <h3>{repos && repos.length > 0 && JSON.parse(repos[0]).stargazers_count > 0 ? 'Top Four Starred Repos' : 'Most Recently Pushed Repos'}</h3>
        <Tiles fill flush={false} selectable size={'small'} >
          {repos && repos.length > 0 ? repos.map((repo, key) => (
            <Tile key={+key + 1}>
              <Card
                heading={<h3>{JSON.parse(repo).name}</h3>}
                size={'medium'}
                description={<Paragraph>
                  {JSON.parse(repo).stargazers_count > 0 ?
                    <span>{JSON.parse(repo).stargazers_count } <StarIcon /></span>
                    : ''}<br />
                  {JSON.parse(repo).language ? JSON.parse(repo).language : ''}<br />
                  {JSON.parse(repo).description ? JSON.parse(repo).description : ''}
                </Paragraph>}
                link={<Anchor href={`https://github.com/${user}/${JSON.parse(repo).name}`} label="Link to repo" />}
              />
            </Tile>
          )) : 'No repos' }
        </Tiles>
      </article>
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
