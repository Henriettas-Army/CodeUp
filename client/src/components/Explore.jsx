import React from 'react';
import Tabs from '../components/Tabs';
import NavContainer from '../containers/NavContainer';
import Map from '../containers/MapData';

const Explore = () => (
  <div>
    <NavContainer />
    <br />
    <br />
    <br />
    <br />
    <br />
<<<<<<< 7deb80d8d35f9e9d07296f7fe76b28a82df4b5d3
    <Tabs />
=======
    <Tabs>
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
>>>>>>> render locations on map view
  </div>
);

export default Explore;
