import React from 'react';
import PropTypes from 'prop-types';
import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Edit from 'grommet/components/icons/base/Edit';
import Section from 'grommet/components/Section';
import TextInput from 'grommet/components/TextInput';
import Paragraph from 'grommet/components/Paragraph';

const TechEditForm = ({ user, updateProfile, skills, desired, location, editProfile, editing }) => {
  let skillsInput = '';
  let desiredInput = '';
  let locationInput = '';
  return (
    <Section>
      <Button
        icon={<Edit />}
        onClick={editProfile}
        plain
        critical={false}
        accent={false}
        secondary={false}
        primary={false}
        hoverIndicator={{ background: 'light-2' }}
        size={'small'}
      />
      { editing ?
        <Layer>
          <Form>
            <Header>
              <Heading tag={'h3'}>
                Profile Edit
              </Heading>
              <Paragraph>
                Add or delete skills:
              </Paragraph>
            </Header>
            <FormFields>
              <FormField htmlFor={'skills'} label={'Technical skills'} help={'separated by comma and a space'} >
                <TextInput
                  id={'skills'}
                  name={'skills'}
                  type={'text'}
                  defaultValue={skills.join(', ')}
                  placeHolder={'ex: JavaScript, Ruby'}
                  onDOMChange={event => (skillsInput = event.target.value)}
                />
              </FormField>
              <FormField label={'Want to learn'} help={'separated by comma and a space'} >
                <TextInput
                  type={'text'}
                  defaultValue={desired.join(', ')}
                  name={'desired'}
                  placeHolder={'ex: React, Angular, Python'}
                  onDOMChange={event => (desiredInput = event.target.value)}
                />

              </FormField>
              <FormField label={'Location'} help={'City, State (Orlando, FL)'} >
                <TextInput
                  type={'text'}
                  defaultValue={location.join(', ')}
                  name={'location'}
                  placeHolder={'ex: Orlando, FL'}
                  onDOMChange={event => (locationInput = event.target.value)}
                />
              </FormField>
            </FormFields>
            <Footer pad={{ vertical: 'medium' }}>
              <Button
                label={'Submit'}
                type={'submit'}
                primary
                onClick={(e) => {
                  e.preventDefault();
                  const updateObj = { username: user, toUpdate: [] };
                  if (skillsInput.length > 0) {
                    const skillsData = { data: skillsInput.split(', '), typeUpdate: 'skills' };
                    updateObj.toUpdate.push(skillsData);
                  }
                  if (desiredInput.length > 0) {
                    const desiredData = { data: desiredInput.split(', '), typeUpdate: 'desired' };
                    updateObj.toUpdate.push(desiredData);
                  }
                  if (locationInput.length > 0) {
                    const locationData = { data: locationInput.split(', '), typeUpdate: 'location' };
                    updateObj.toUpdate.push(locationData);
                  }
                  updateProfile(updateObj);
                }
                }
              />
              <Button
                type={'button'}
                label={'Cancel'}
                primary={false}
                onClick={editProfile}
              />
            </Footer>
          </Form>
        </Layer>
        : ''
      }
    </Section>
  );
};

TechEditForm.propTypes = {
  user: PropTypes.string,
  location: PropTypes.arrayOf(PropTypes.string),
  desired: PropTypes.arrayOf(PropTypes.string),
  skills: PropTypes.arrayOf(PropTypes.string),
  editing: PropTypes.bool.isRequired,
  updateProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
};

TechEditForm.defaultProps = {
  user: '',
  location: [],
  desired: [],
  skills: [],
};

export default TechEditForm;
