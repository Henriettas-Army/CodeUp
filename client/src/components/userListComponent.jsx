import React from 'react';
import PropTypes from 'prop-types';
import Card from 'grommet/components/Card';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Anchor from 'grommet/components/Anchor';
import CliIcon from 'grommet/components/icons/base/Cli';
import Status from 'grommet/components/icons/Status';

const UserList = ({ users }) => (
  <Tiles className={'userTiles flex-container'} fill={false} flush={false}>
    {users.map((user, key) =>
      (<Tile className={'userTile'} key={user._id + +key} align={'start'}>
        <Card
          label={<Anchor
            style={{ color: '#2E8C65' }}
            className={'userAnchor'}
            href="#"
            path={`/profile/${user.username}`}
          ><img className={'profilePic'} alt="Profilepic" src={`${user.img}`} />
            <p className={'userHeader'}><h2>{user.username}</h2>
              {user.location.length > 0 ? user.location.join(', ') : 'Not Specified'}</p></Anchor>}
          contentPad="none"
          link={user.status === 'Unavailable' ? (<span> <Status value="critical" />Unavailable</span>)
                : (<span> {user.status === 'Available' ? <Status value="ok" />
                : <CliIcon colorIndex={user.status ? 'accent-3' : 'critical'} />}{user.status || '  offline'}</span>)}
          heading={<p>{user.skills.join(' | ') || 'Skills Not Available'}</p>}
          description={
            <span>
              <strong className={'userDescription'}>Developing: </strong>{`${user.desired.join(', ') || 'N/A'}`}<br />
              <strong className={'userDescription'}>About Me: </strong>{`-${user.bio ? user.bio : 'N/A'}`}
            </span>
          }
        />
      </Tile>)
    )}
  </Tiles>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserList;
