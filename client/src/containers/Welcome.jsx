/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { connect } from 'react-redux';
import Section from 'grommet/components/Section';
import Animate from 'grommet/components/Animate';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Spinning from 'grommet/components/icons/Spinning';
import loginActions from '../../redux/actions/loginActions';
import Explore from './Explore';

class Welcome extends Component {
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
    let page;
    if (this.props.status === '') {
      page = (
        <Animate
          enter={{ animation: 'fade', duration: 5000, delay: 0 }}
          keep
        >
          <div className="welcome" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Heading tag="h3">Welcome to</Heading><br />
            <Heading tag="h2">codeUp</Heading><br />
            <p style={{ textAlign: 'center' }}>
              Find a partner to code with, attend events, and get involved with the coding community
            </p>
            <Anchor href="#" path="/login" className="active" label="Login" />
          </div>
        </Animate>
      );
    } else if (this.props.status === 'LOADING') {
      page = <Heading tag="h3">Thank you for your patience<Spinning /></Heading>;
    } else if (this.props.status === 'READY') {
      // redirect to explore OR JUST RENDER EXPLORE!!! hahaha
      page = <Explore />;
    }
    return (
      <Section>
        {page}
      </Section>
    );
  }
}

Welcome.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string,
  status: PropTypes.string.isRequired,
};

Welcome.defaultProps = {
  isAuthenticated: PropTypes.string,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  status: state.auth.status,
});

const mapDispatchToProps = dispatch => ({
  loginUser: () => {
    dispatch(loginActions.loginUser(jwtDecode(window.localStorage.getItem('token')), 'Available'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
