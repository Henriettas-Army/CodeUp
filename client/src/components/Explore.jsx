import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Events from '../containers/Events';
import Users from '../containers/Users';
import NavContainer from '../containers/NavContainer';
import Map from '../containers/MapData';
import '../styles/events.scss';

const Explore = ({ match }) => (
  <div>
    <NavContainer match={match} />
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

Explore.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }),
};

Explore.defaultProps = {
  match: {},
};

export default Explore;
