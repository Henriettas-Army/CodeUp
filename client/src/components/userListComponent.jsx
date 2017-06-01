import React from 'react';
import PropTypes from 'prop-types';
import Card from 'grommet/components/Card';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Paragraph from 'grommet/components/Paragraph';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import CliIcon from 'grommet/components/icons/base/Cli';
import Status from 'grommet/components/icons/Status';

const UserList = ({ users }) => (
  <Tiles fill flush={false}>
    {users.map((user, key) =>
      (<Tile key={user._id + +key} align={'start'}>
        <Card
          thumbnail={user.img}
          contentPad="small"
          label={user.status === 'Unavailable' ? (<span> <Status value="critical" />Unavailable</span>)
                : (<span> {user.status === 'Available' ? <Status value="ok" /> : <CliIcon />}{user.status}</span>)}
          heading={user.username}
          link={<Anchor
            href="#"
            path={`/profile/${user.username}`}
            label={`Link to ${user.username} profile`}
            size="medium"
          />}
          description={
            <Accordion>
              <AccordionPanel heading={user.skills.join(' | ')} >
                <Heading tag={'h3'}>Location:</Heading>
                <Paragraph>
                  {user.location.length > 0 ? user.location.join(', ') : 'N/A'}
                </Paragraph>
                <Heading tag={'h3'}>Skills in Development:</Heading>
                <Paragraph>
                  {user.desired.join('  |  ')}
                </Paragraph>
                <Heading tag={'h3'}>About:</Heading>
                <Paragraph>
                  {user.bio ? user.bio : 'N/A'}
                </Paragraph>
              </AccordionPanel>
            </Accordion>}
        />
      </Tile>)
    )}
  </Tiles>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserList;
