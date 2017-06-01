import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EndorsementCreator from '../components/EndorsementCreator';

class EndorsementCreatorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: '' };
  }
  toggleSkill(skill) {
    this.setState({ [skill]: (this.state ? !this.state[skill] : true) });
  }
  writeComment(inputString) {
    console.log(inputString);
    this.setState({ comments: inputString });
  }
  render() {
    return (
      <EndorsementCreator
        {...this.props}
        toggleSkill={(s) => { this.toggleSkill(s); }}
        writeComment={(c) => { this.writeComment(c); }}
      />
    );
  }
}

EndorsementCreatorContainer.propTypes = {
  skillsToEndorse: PropTypes.arrayOf(PropTypes.string).isRequired,
  closeEC: PropTypes.func.isRequired,
};

export default EndorsementCreatorContainer;
