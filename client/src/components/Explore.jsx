import React from 'react';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Events from '../containers/Events';
import Users from '../containers/Users';
import NavContainer from '../containers/NavContainer';
import Map from '../containers/MapData';
import '../styles/events.scss';


const Explore = () => (
  <div>
    <NavContainer />
    <Tabs className="tabsContainer">
      <Tab title="Events">
        <Events />
      </Tab>
      <Tab title="Users">
        <Users />
      </Tab>
      <Tab title="Map">
        <Map />
      </Tab>
    </Tabs>
  </div>
);
export default Explore;
