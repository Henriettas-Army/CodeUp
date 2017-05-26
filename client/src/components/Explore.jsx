import React from 'react';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Events from '../containers/Events';
import Users from '../containers/Users';
import Nav from '../containers/Nav';

const Explore = () => (
  <div>
    <Nav />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Tabs>
      <Tab title="Events">
        <Events />
      </Tab>
      <Tab title="Users">
        <Users />
      </Tab>
    </Tabs>
  </div>
);

export default Explore;
