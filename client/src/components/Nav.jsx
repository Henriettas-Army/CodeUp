import React from 'react';
import PropTypes from 'prop-types';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import UserSettingsIcon from 'grommet/components/icons/base/UserSettings';
import InheritIcon from 'grommet/components/icons/base/Inherit';
import Anchor from 'grommet/components/Anchor';
import SearchContainer from '../containers/SearchContainer';

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
        path="/explore"
        className="active"
        animateIcon={false}
        style={{ color: '#2E8C65' }}
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
      <SearchContainer />
      <br />
      <Anchor
        icon={<InheritIcon />}
        href="#"
        path="/explore"
        className="active"
        animateIcon={false}
        style={{ color: '#2E8C65' }}
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
          animateIcon={false}
          style={{ color: '#2E8C65' }}
        >
          Profile
        </Anchor>
        <Anchor
          onClick={logoutUser}
          animateIcon={false}
          style={{ color: '#2E8C65' }}
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

export default Nav;
