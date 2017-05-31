import React from 'react';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Events from '../containers/Events';
import Users from '../containers/Users';
import NavContainer from '../containers/NavContainer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginActions from '../../redux/actions/loginActions';
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
    </Tabs>
  </div>
);

Explore.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

Explore.defaultProps = {
  isAuthenticated: '',
  // staticContext: undefined,
  // history: {},
  // match: {},
  // location: {},
};

const mapStateToProps = state => (
  ({
    isAuthenticated: state.auth.isAuthenticated,
  })
);

const mapDispatchToProps = dispatch => ({
  loginUser: (username) => {
    dispatch(loginActions.loginUser(username));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Explore);
