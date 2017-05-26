import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UserList from '../components/userListComponent';
import userAction from '../../redux/actions/userListAction';

class Users extends React.Component {
  componentDidMount() {
    this.props.listUsers();
  }
  render() {
    console.log('PROPS MOTHSSDKJFK', this.props.users);
    const users = this.props.users;

    return (
      <div>
        <UserList users={users} />
      </div>
    );
  }
}

// Users.propTypes = {
//   users: PropTypes.arrayOf(PropTypes.object).isRequired,
//   listUsers: PropTypes.func.isRequired,
// };

const mapStateToProps = state => {
  console.log('STATE', state);
  return {users: state.users}
};

const mapDispatchToProps = dispatch => ({
  listUsers: () => {
    console.log(userAction);
    dispatch(userAction.loadAllUsers());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
