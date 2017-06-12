import React from 'react';
import PropTypes from 'prop-types';
import Select from 'grommet/components/Select';
import Status from 'grommet/components/icons/Status';
import CodeIcon from 'grommet/components/icons/base/Code';

const UserStatus = ({ user, updateProfile, status }) => (
  <span>
    <h3><strong>Status</strong>
      {
        status === 'Unavailable' ? (<span> <Status value="critical" /></span>)
        : (<span> {status === 'Available' ? <Status value="ok" /> : <CodeIcon colorIndex={'accent-3'} className="codeNow" />}</span>)
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
  </span>
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
