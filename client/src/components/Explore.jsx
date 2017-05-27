/* global window */
import React, { Component } from 'react';
import axios from 'axios';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Events from '../containers/Events';
import Users from '../containers/Users';
import Nav from '../containers/Nav';


class Explore extends Component {
  componentWillMount() {
    if (window.location.search) {
      const code = window.location.search.split('=')[1];
      axios.post('/api/users/login', { code })
      .then((token) => {
        console.log('BEFORE STORAGE', this.props.isAuthenticated, this.props.status);
        window.localStorage.setItem('token', token.data);
        this.props.loginUser();
        console.log('AFTER STORAGE', this.props.isAuthenticated, this.props.status);
      }).then( () => {
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
  };
}

export default Explore;
