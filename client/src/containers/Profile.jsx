import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserRepos from '../components/UserRepos';
import UserInfo from '../components/UserInfo';
import profileActions from '../../redux/actions/profileActions';

class Profile extends React.Component {
  componentDidMount() {
    // take username out of the url then get profile -- react router
    this.props.loadProfile(this.props.isAuthenticated);
  }
  render() {
    const profile = this.props.profile;
    const status = this.props.status;
    const updateProfile = this.props.updateProfile;
    const currentUser = this.props.isAuthenticated;
    const editing = this.props.editing;
    const editProfile = this.props.editProfile;
    return (
      <div>
        <div> USER PROFILE </div>
        <UserInfo
          profile={profile}
          status={status}
          updateProfile={updateProfile}
          currentUser={currentUser}
          editing={editing}
          editProfile={editProfile}
        />
        <UserRepos
          repos={profile.repos}
          status={status}
          user={profile.username}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  // path: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.string,
  profile: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    bio: PropTypes.string,
    repos: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.arrayOf(PropTypes.string),
    desired: PropTypes.arrayOf(PropTypes.string),
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

Profile.defaultProps = {
  isAuthenticated: '',
};

const mapStateToProps = state => (
  ({
    profile: state.profile.profile,
    status: state.profile.status,
    isAuthenticated: state.auth.isAuthenticated,
    editing: state.profile.editing,
  })
);

const mapDispatchToProps = dispatch => ({
  loadProfile: (username) => {
    dispatch(profileActions.loadProfileAsync(username));
  },
  updateProfile: (userObj) => {
    dispatch(profileActions.updateProfileAsync(userObj));
  },
  editProfile: () => {
    dispatch(profileActions.editProfile());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
