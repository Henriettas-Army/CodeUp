/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'grommet/components/icons/Spinning';
import EndorsementCreator from '../components/EndorsementCreator';
import { postEndorsement } from '../../redux/actions/endorsementActions';
import profileActions from '../../redux/actions/profileActions';

class EndorsementCreatorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      comments: '',
      skills: props.skillsToEndorse.slice(),
    };
    this.writeTitle = this.writeTitle.bind(this);
    this.writeComment = this.writeComment.bind(this);
    this.removeSkill = this.removeSkill.bind(this);
    this.sendEndorsement = this.sendEndorsement.bind(this);
    this.resetSkills = this.resetSkills.bind(this);
  }
  writeTitle(inputString) {
    this.setState({ title: inputString });
  }
  writeComment(inputString) {
    this.setState({ comments: inputString });
  }
  removeSkill(skill) {
    const skills = this.state.skills.slice();
    if (skills.includes(skill)) {
      skills.splice(skills.indexOf(skill), 1);
    }
    this.setState({ skills });
  }
  sendEndorsement() {
    const endorsement = {
      endorserToken: window.localStorage.getItem('token'),
      endorsee: this.props.endorsed,
      skills: this.state.skills,
      title: this.state.title,
      comments: this.state.comments,
    };
    this.props.postEndorsement(endorsement)
    .then(() => { this.props.loadProfile(this.props.endorsed); });
    this.props.closeEC();
    this.props.showToast(`Thanks for endorsing ${this.props.endorsed}`);
  }
  resetSkills() {
    const reset = this.props.skillsToEndorse.slice();
    this.setState({ skills: reset });
  }
  render() {
    return (
      <div>
        <EndorsementCreator
          {...this.props}
          skills={this.state.skills}
          removeSkill={this.removeSkill}
          resetSkills={this.resetSkills}
          writeComment={this.writeComment}
          sendEndorsement={this.sendEndorsement}
          writeTitle={this.writeTitle}
        />
        {
          this.props.status === 'LOADING' ?
            <Spinner /> : null
        }
      </div>
    );
  }
}

EndorsementCreatorContainer.propTypes = {
  skillsToEndorse: PropTypes.arrayOf(PropTypes.string).isRequired,
  closeEC: PropTypes.func.isRequired,
  endorsed: PropTypes.string.isRequired,
  postEndorsement: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  status: PropTypes.string,
  loadProfile: PropTypes.func.isRequired,
};

EndorsementCreatorContainer.defaultProps = {
  status: '',
};

const mapStateToProps = state => ({ status: state.postEndorsement.status });

const mapDispatchToProps = dispatch => ({
  postEndorsement: end => dispatch(postEndorsement(end)),
  loadProfile: (username) => {
    dispatch(profileActions.loadProfileAsync(username));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EndorsementCreatorContainer);
