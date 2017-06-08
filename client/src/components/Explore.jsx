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
    <br />
    <br />
    <br />
    <br />
    <br />
    <Tabs>
      <Tab className="eventContainer" title="Events">
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
