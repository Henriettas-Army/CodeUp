import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserList from '../components/userListComponent';
import userAction from '../../redux/actions/userListAction';

class Users extends React.Component {
  componentWillMount() {
    this.props.listUsers(this.props.isAuthenticated);
  }
  render() {
    let users = this.props.users.users;
    users = users.filter(u => u.username.includes(this.props.searchQuery));
    return (
      <div>
        <UserList users={users} />
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  searchQuery: PropTypes.string.isRequired,
  listUsers: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string,
};

Users.defaultProps = {
  isAuthenticated: '',
};

const mapStateToProps = state => ({
  users: state.users,
  searchQuery: state.search.searchQuery,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  listUsers: (username) => {
    dispatch(userAction.loadAllUsers(username));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
