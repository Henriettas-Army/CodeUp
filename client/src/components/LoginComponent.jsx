/* global window */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { loginUser } from '../../redux/actions/loginActions';

const GITHUB_API = require('../../../server/config/github');

const CLIENT_ID = GITHUB_API.CLIENT_ID;

class LoginComponent extends Component {

  componentWillMount() {
    console.log(this);
    if (window.location.search) {
      const code = window.location.search.split('=')[1];
      axios.post('/api/users/login', { code })
      .then((token) => {
        console.log('TOKEN BACK TO CLINT');
        window.localStorage.setItem('token', token.data);
        console.log(this.props);
        this.props.dispatch(loginUser(jwtDecode(window.localStorage.getItem('token')), 'Available'));
        console.log('AFTER ACTION', this.props);
      });
    }
    window.localStorage.setItem('token', '');
  }

  render() {
    return (
      <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user,repo`}>
        Log In With GitHub
      </a>
    );
  }
}

LoginComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LoginComponent);
