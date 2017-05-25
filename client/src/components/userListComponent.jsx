import React from 'react';

const UserList = users => (
  <div>
    <ul>
      {users.map(user => <li>{ user.username }</li>)}
    </ul>
  </div>
);

export default UserList;
