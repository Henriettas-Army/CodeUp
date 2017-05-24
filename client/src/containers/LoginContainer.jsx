import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../../redux/actions/loginActions';

class LoginContainer extends Component {

  login() {
    axios.get('http://github.com/login/oauth/authorize')
    .then(res =>
      console.log(res),
    );
  }

  render() {
    return (
      <div>
        <button onClick={() => this.login()}>GITHUB LOGIN</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: () => {
      dispatch(loginUser);
    },
  };
};

export default connect(
  mapDispatchToProps,
)(LoginContainer);
