import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import UserInfo from '../components/UserInfo';
import UserRepos from '../components/UserRepos';
import profileActions from '../../redux/actions/profileActions';

class Profile extends React.Component {
  componentDidMount() {
    // console.log(this.props.path);
    // do api call to server to get user profile from db
    // take username out of the url then get profile -- react router
    this.props.loadProfile('techmexdev');
  }
  render() {
    const profile = this.props.profile;
    const status = this.props.status;
    const updateProfile = this.props.updateProfile;
    const currentUser = this.props.isAuthenticated;
    return (
      <div>
        <div> USER PROFILE </div>
        {/* <UserInfo
          profile={profile}
          status={status}
          updateProfile={updateProfile}
          currentUser={currentUser}
        /> */}
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
  isAuthenticated: undefined,
};

const mapStateToProps = state => (
  ({
    profile: state.profile.profile,
    status: state.profile.status,
    isAuthenticated: state.auth.isAuthenticated,
  })
);

const mapDispatchToProps = dispatch => ({
  loadProfile: (username) => {
    dispatch(profileActions.loadProfileAsync(username));
  },
  updateProfile: (userObj) => {
    dispatch(profileActions.updateProfileAsync(userObj));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
