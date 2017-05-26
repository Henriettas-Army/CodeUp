import React, { PropTypes } from 'react';
import Card from 'grommet/components/Card';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Paragraph from 'grommet/components/Paragraph';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Heading from 'grommet/components/Heading';

const UserList = ({ users }) => (
  <Tiles fill flush={false}>
    {users.map(user =>
      (<Tile key={user._id} align={'start'}>
        <Card
          label={user.status}
          heading={user.username}
          description={
            <Accordion>
              <AccordionPanel heading={'User Info'}>
                <Heading tag={'h3'}>Skills:</Heading>
                <Paragraph>
                  {user.skills}
                </Paragraph>
                <Heading tag={'h3'}>Skills Developing:</Heading>
                <Paragraph>
                  {user.desired}
                </Paragraph>
                <Heading tag={'h3'}>location:</Heading>
                <Paragraph>
                  {user.location }
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
