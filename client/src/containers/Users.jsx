import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserList from '../components/userListComponent';
import userAction from '../../redux/actions/userListAction';

class Users extends React.Component {
  componentDidMount() {
    this.props.listUsers();
  }
  render() {
    const users = this.props.users;
    const filtered = users.users.filter(user => (user.username !== this.props.isAuthenticated));
    return (
      <div>
        <UserList users={filtered} isAuthenticated={this.props.isAuthenticated} />
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  listUsers: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string,
};

Users.defaultProps = {
  isAuthenticated: '',
};

const mapStateToProps = state => ({
  users: state.users,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  listUsers: () => {
    dispatch(userAction.loadAllUsers());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
