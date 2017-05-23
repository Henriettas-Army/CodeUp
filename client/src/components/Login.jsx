import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requestLogin, receiveLogin, loginError } from '../../redux/actions/loginActions';

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <button>GITHUB LOGIN</button>
      </div>
    );
  }
}
