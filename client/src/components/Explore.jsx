/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import NavContainer from '../containers/NavContainer';
import Events from '../containers/Events';
import Users from '../containers/Users';
import Map from '../containers/MapData';


const Explore = () => (
  <div>
    <NavContainer />
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
      <Tab title="Map">
        <Map />
      </Tab>
    </Tabs>
  </div>
);
 export default Explore;