import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import UserSettingsIcon from 'grommet/components/icons/base/UserSettings';
import InheritIcon from 'grommet/components/icons/base/Inherit';
import Anchor from 'grommet/components/Anchor';
import loginActions from '../../redux/actions/loginActions';

const Nav = ({ logoutUser, isAuthenticated }) => (
  <Header
    fixed
    float
    splash={false}
    size="small"
  >
    <Title>
      <Anchor
        href="#"
        path="/"
        className="active"
      >
        codeUp
      </Anchor>
    </Title>
    <Box
      flex
      justify="end"
      direction="row"
      responsive={false}
    >
      <Search
        inline
        fill
        size="medium"
        placeHolder="Search"
        dropAlign={{ right: 'right' }}
      />
      <Anchor
        icon={<InheritIcon />}
        href="#"
        path="/"
        className="active"
      />
      <Menu
        icon={
          <UserSettingsIcon />
        }
        dropAlign={{ right: 'right', top: 'top' }}
      >
        <Anchor
          href="#"
          path={`/profile/${isAuthenticated}`}
          className="active"
        >
          Profile
        </Anchor>
        <Anchor
          onClick={logoutUser}
        >
          Logout
        </Anchor>
      </Menu>
    </Box>
  </Header>
);

Nav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string,
};

Nav.defaultProps = {
  isAuthenticated: '',
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(loginActions.logoutUser('', 'Unavailable'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);