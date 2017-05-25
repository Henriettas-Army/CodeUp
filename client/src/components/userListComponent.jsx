import React, { PropTypes } from 'react';

const UserList = ({ users }) => (
  <div>
    <ul>
      {users.map(user => <li>{ user.username }</li>)}
    </ul>
  </div>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserList;
