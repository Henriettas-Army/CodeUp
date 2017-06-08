import React from 'react';
import PropTypes from 'prop-types';
import Section from 'grommet/components/Section';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Chip from 'react-toolbox/lib/chip';

const EndorsementCreator = props => (
  <Section>
    <Layer closer onClose={props.closeEC}>
      <Form>
        <h2 className="header-margin">
          Endorse
        </h2>
        <FormField label="Title">
          <TextInput onDOMChange={e => props.writeTitle(e.target.value)} />
        </FormField>
        <FormField label="Comments">
          <TextInput
            onDOMChange={e => props.writeComment(e.target.value)}
          />
        </FormField>
        <br />
        <div className="endorse-skills">
          <span>
            {
              props.skills.map(skill => (
                <Chip key={Math.random()} deletable onDeleteClick={() => props.removeSkill(skill)}>
                  {skill}
                </Chip>
              ))
            }
          </span>
          <div>
            <button
              onClick={(e) => { e.preventDefault(); props.resetSkills(); }}
              size="small"
              style={{ backgroundColor: 'transparent', borderStyle: 'none', fontSize: '15px', padding: 0, marginAfter: '5px', margin: 0 }}
            >
                Reset Skills
              </button>
          </div>
        </div>
        <Footer pad={{ vertical: 'medium' }}>
          <span className="button-tech">
            <Button
              primary
              label="Submit"
              type="button"
              onClick={() => props.sendEndorsement()}
              style={{ backgroundColor: '#2E8C65', borderStyle: 'none', color: 'white', textShadow: '0.5px 0.5px grey' }}
            />
          </span>
        </Footer>
      </Form>
    </Layer>
  </Section>
);

/* eslint-disable react/no-unused-prop-types */

EndorsementCreator.propTypes = {
  closeEC: PropTypes.func.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string),
  writeTitle: PropTypes.func.isRequired,
  removeSkill: PropTypes.func.isRequired,
  resetSkills: PropTypes.func.isRequired,
  writeComment: PropTypes.func.isRequired,
  sendEndorsement: PropTypes.func.isRequired,
};
/* eslint-enable react/no-unused-prop-types */
EndorsementCreator.defaultProps = {
  skillsToEndorse: [],
  skills: [],
};

export default EndorsementCreator;
