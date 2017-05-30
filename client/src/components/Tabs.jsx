import React from 'react';
import GTabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Events from '../containers/Events';
import Users from '../containers/Users';

const Tabs = () => (
  <GTabs>
    <Tab title="Events">
      <Events />
    </Tab>
    <Tab title="Users">
      <Users />
    </Tab>
  </GTabs>
);

export default Tabs;
