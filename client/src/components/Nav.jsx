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

const Nav = props => (
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
      <SearchContainer />
      <Anchor
        icon={<InheritIcon />}
        href="#"
        path="/explore"
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
          path="/profile"
          className="active"
        >
          Profile
        </Anchor>
        <Anchor
          onClick={props.logoutUser}
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

export default Nav;
