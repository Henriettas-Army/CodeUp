/* global window */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import loginActions from '../../redux/actions/loginActions';
import Events from '../containers/Events';
import Users from '../containers/Users';
import Nav from '../containers/Nav';

class Explore extends Component {
  componentWillMount() {
    if (window.location.search) {
      const code = window.location.search.split('=')[1];
      axios.post('/api/users/login', { code })
      .then((token) => {
        window.localStorage.setItem('token', token.data);
        this.props.loginUser();
      }).then(() => {
        window.location.href = `/${this.props.isAuthenticated}`;
      });
    }
  }
  render() {
    return (
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
  }
}

Explore.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string,
};

Explore.defaultProps = {
  isAuthenticated: '',
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
