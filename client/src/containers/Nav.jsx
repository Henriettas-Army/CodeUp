import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import UserSettingsIcon from 'grommet/components/icons/base/UserSettings';
import Anchor from 'grommet/components/Anchor';
import loginActions from '../../redux/actions/loginActions';

const Nav = ({ logoutUser }) => (
  <Header
    fixed
    float
    splash={false}
    size="small"
  >
    <Title>
      codeUp
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
      <div
        className="exploreLink"
        style={{ fontSize: '18px', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '50px', paddingRight: '50px' }}
      >
        Explore
      </div>
      <Menu
        icon={
          <UserSettingsIcon />
        }
        dropAlign={{ right: 'right', top: 'top' }}
      >
        <Anchor
          href="#"
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
