import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';
import Edit from 'grommet/components/icons/base/Edit';
import Button from 'grommet/components/Button';
import NavContainer from '../containers/NavContainer';
import UserRepos from '../components/UserRepos';
import UserInfo from '../components/UserInfo';
import EndorsementCreatorContainer from '../containers/EndorsementCreatorContainer';
import EndorsementsContainer from '../containers/EndorsementsContainer';
import profileActions from '../../redux/actions/profileActions';
import '../styles/styles.scss';

class Profile extends React.Component {
  componentWillMount() {
    this.state = { endorsementCreatorOpen: false };
  }
  componentDidMount() {
    this.props.loadProfile(this.props.match.params.username);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.props.loadProfile(nextProps.match.params.username);
    }
  }
  closeEC() {
    this.setState({ endorsementCreatorOpen: false });
  }
  render() {
    const profile = this.props.profile;
    const status = this.props.status;
    const updateProfile = this.props.updateProfile;
    const currentUser = this.props.isAuthenticated;
    const editing = this.props.editing;
    const editProfile = this.props.editProfile;
    return (
      <GrommetApp>
        <NavContainer />
        <div>
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
          <Button
            icon={<Edit />}
            label="Endorse this person"
            onClick={() => { this.setState({ endorsementCreatorOpen: true }); }}
            primary
          />
          { this.state.endorsementCreatorOpen ?
            <EndorsementCreatorContainer
              closeEC={() => { this.closeEC(); }}
              skillsToEndorse={profile.skills.concat(profile.desired)}
              endorsed={profile.username}
            />
            : null
          }
          <EndorsementsContainer />
        </div>
      </GrommetApp>
    );
  }
}

Profile.propTypes = {
  loadProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
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
    meter: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
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
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
