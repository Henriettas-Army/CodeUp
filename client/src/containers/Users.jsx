import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserList from '../components/userListComponent';
import userAction from '../../redux/actions/userListAction';

class Users extends React.Component {
  componentWillMount() {
    this.props.listUsers();
  }
  render() {
    const users = this.props.users.users.filter(u => u.username.includes(this.props.searchQuery));
    return (
      <div>
        <UserList users={users} />
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  listUsers: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
  searchQuery: state.search.searchQuery,
});

const mapDispatchToProps = dispatch => ({
  listUsers: () => {
    dispatch(userAction.loadAllUsers());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
