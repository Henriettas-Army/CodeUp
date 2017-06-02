/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'grommet/components/icons/Spinning';
import EndorsementCreator from '../components/EndorsementCreator';
import { postEndorsement } from '../../redux/actions/endorsementActions';

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
    const endorsement = {
      endorserToken: window.localStorage.getItem('token'),
      endorsee: this.props.endorsed,
      skills: this.state.skills,
      comments: this.state.comments,
    };
    this.props.postEndorsement(endorsement);
    this.props.closeEC();
    this.props.showToast(`Thanks for endorsing ${this.props.endorsed}`);
  }
  render() {
    return (
      <div>
        <EndorsementCreator
          {...this.props}
          toggleSkill={(s) => { this.toggleSkill(s); }}
          writeComment={(c) => { this.writeComment(c); }}
          sendEndorsement={() => { this.sendEndorsement(); }}
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
  status: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ status: state.postEndorsement.status });

const mapDispatchToProps = dispatch => ({
  postEndorsement: (end) => { dispatch(postEndorsement(end)); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EndorsementCreatorContainer);
