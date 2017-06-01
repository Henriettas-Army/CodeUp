import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GrommetApp from 'grommet/components/App';
import Edit from 'grommet/components/icons/base/Edit';
import Button from 'grommet/components/Button';
import NavContainer from '../containers/NavContainer';
import UserRepos from '../components/UserRepos';
import UserInfo from '../components/UserInfo';
import EndorsementCreatorContainer from '../containers/EndorsementCreatorContainer';
import EndorsementsContainer from '../containers/EndorsementsContainer';
import profileActions from '../../redux/actions/profileActions';
import chatActions from '../../redux/actions/chatActions';

import '../styles/styles.scss';

class Profile extends React.Component {
  componentWillMount() {
    this.state = { endorsementCreatorOpen: false };
  }
  componentDidMount() {
    this.props.loadProfile(decodeURIComponent(this.props.match.params.username));
  }
  componentWillReceiveProps(nextProps) {
    const current = decodeURIComponent(this.props.match.params.username);
    const next = decodeURIComponent(nextProps.match.params.username);
    if (current !== next) {
      this.props.loadProfile(next);
    }
  }
  closeEC() {
    this.setState({ endorsementCreatorOpen: false });
  }
  render() {
    const profile = this.props.profile;
    const status = this.props.status;
    const errMessage = this.props.errMessage;
    const updateProfile = this.props.updateProfile;
    const currentUser = this.props.isAuthenticated;
    const editing = this.props.editing;
    const editProfile = this.props.editProfile;
    const props = this.props;
    return (
      <GrommetApp>
        <NavContainer />
        <div>
          <UserInfo
            profile={profile}
            status={status}
            errMessage={errMessage}
            updateProfile={updateProfile}
            currentUser={currentUser}
            editing={editing}
            editProfile={editProfile}
            addChatRoom={() => { props.addChatRoom([currentUser, profile.username].sort().join('#')); }}
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
  errMessage: PropTypes.string,
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
  addChatRoom: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  isAuthenticated: '',
  errMessage: PropTypes.string,
};

const mapStateToProps = state => (
  ({
    profile: state.profile.profile,
    status: state.profile.status,
    isAuthenticated: state.auth.isAuthenticated,
    editing: state.profile.editing,
    errMessage: state.profile.errMessage,
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
  addChatRoom: (room, unread) => {
    dispatch(chatActions.addRoom(room, unread));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile));
