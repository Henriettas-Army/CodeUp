/* global window */
import React, { Component } from 'react';
import axios from 'axios';
import Tabs from '../components/Tabs';
import NavContainer from '../containers/NavContainer';

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
        <NavContainer />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Tabs />
      </div>
    );
  }
}

export default Explore;
