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
    let users = this.props.users.users.filter(user => user.username !== this.props.isAuthenticated);
    users = users.filter(u =>
      u.username.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      JSON.stringify(u.meter).toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      JSON.stringify(u.location).toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      JSON.stringify(u.skills).toLowerCase().includes(this.props.searchQuery.toLowerCase())
    );
    return (
      <div>
        <UserList
          users={users}
        />
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
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
  listUsers: () => {
    dispatch(userAction.loadAllUsers());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
