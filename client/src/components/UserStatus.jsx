import React from 'react';
import PropTypes from 'prop-types';
import Select from 'grommet/components/Select';
import Section from 'grommet/components/Section';
import Status from 'grommet/components/icons/Status';
import CliIcon from 'grommet/components/icons/base/Cli';

const UserStatus = ({ user, updateProfile, status }) => (
  <Section>
    <h3>Status
    {
      status === 'Unavailable' ? (<span> <Status value="critical" /></span>)
      : (<span> {status === 'Available' ? <Status value="ok" /> : <CliIcon />}</span>)
    }
    </h3>
    <Select
      placeHolder={user}
      inline={false}
      multiple={false}
      options={['Available', 'Unavailable', 'Code Now']}
      value={status}
      onChange={({ value }) => (updateProfile({ username: user, toUpdate: [{ data: value, typeUpdate: 'status' }] }))}
    />
  </Section>
);

UserStatus.propTypes = {
  user: PropTypes.string,
  status: PropTypes.string,
  updateProfile: PropTypes.func.isRequired,
};

UserStatus.defaultProps = {
  user: '',
  status: 'Unavailable',
};

export default UserStatus;
