/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import EndorsementCreator from '../components/EndorsementCreator';

class EndorsementCreatorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: '',
      skills: [],
    };
  }
  toggleSkill(skill) {
    const skills = this.state.skills;
    if (skills.includes(skill)) {
      skills.splice(skills.indexOf(skill), 1);
    } else {
      skills.push(skill);
    }
    this.setState({ skills });
  }
  writeComment(inputString) {
    this.setState({ comments: inputString });
  }
  sendEndorsement() {
    axios.post('/api/endorsement', {
      endorserToken: window.localStorage.getItem('token'),
      endorsee: this.props.endorsed,
      skills: this.state.skills,
      comments: this.state.comments,
    });
    this.props.closeEC();
    this.props.showToast(`Thanks for endorsing ${this.props.endorsed}`);
  }
  render() {
    return (
      <EndorsementCreator
        {...this.props}
        toggleSkill={(s) => { this.toggleSkill(s); }}
        writeComment={(c) => { this.writeComment(c); }}
        sendEndorsement={() => { this.sendEndorsement(); }}
      />
    );
  }
}

EndorsementCreatorContainer.propTypes = {
  skillsToEndorse: PropTypes.arrayOf(PropTypes.string).isRequired,
  closeEC: PropTypes.func.isRequired,
  endorsed: PropTypes.string.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default EndorsementCreatorContainer;
