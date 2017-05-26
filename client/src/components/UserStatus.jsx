import React from 'react';
import PropTypes from 'prop-types';
import Select from 'grommet/components/Select';
import Section from 'grommet/components/Section';

const UserStatus = ({ user, updateProfile, status }) => (
  <Section>
    <h6>Status</h6>
    <Select
      placeHolder={user}
      inline={false}
      multiple={false}
      options={['Available', 'Unavailable', 'Code Now']}
      value={status}
      onChange={({ value }) => (updateProfile({ username: user, data: value, typeUpdate: 'status' }))}
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