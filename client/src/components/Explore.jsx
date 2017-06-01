/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Tabs from '../components/Tabs';
import NavContainer from '../containers/NavContainer';
import loginActions from '../../redux/actions/loginActions';

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
