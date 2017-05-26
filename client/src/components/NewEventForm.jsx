import React from 'react';
import PropTypes from 'prop-types';
import Select from 'grommet/components/Select';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

const EMPTY_FORM = {
  title: '',
  date: new Date(),
  description: '',
  duration: '',
  location: '',
  topics: '',
};

class NewEventForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = EMPTY_FORM;
  }

  render() {
    const createEvent = this.props.createEvent;
    return (
      <Form>
        <FormField>
          <TextInput
            id={'title'}
            name={'title'}
            placeHolder={'title of your event'}
            value={this.state.title}
            onDOMChange={e => this.setState({ title: e.target.value })}
          />
        </FormField>
        <FormField>
          <DateTime
            name={'dateTime'}
            value={this.state.date}
            onChange={(e) => { this.setState({ date: e }); }} 
          />
        </FormField>
        <FormField>
          <textarea
            placeholder="provide a description for your event"
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={e => this.setState({ description: e.target.value })}
            value={this.state.description}
          />
        </FormField>
        <FormField>
          <TextInput
            id={'location'}
            name={'location'}
            placeHolder={'location'}
            value={this.state.location}
            onDOMChange={e => this.setState({ location: e.target.value })}
          />
        </FormField>
        <FormField>
          <Select
            placeHolder={'Select estimated duration'}
            inline={false}
            multiple={false}
            options={['Less than 1 hour', '1-2 hours', '2-3 hours', 'More than 3 hours']}
            value={this.state.duration}
            onChange={(e) => { this.setState({ duration: e }); }}
          />
        </FormField>
        <FormField>
          <TextInput
            id={'topics'}
            name={'topics'}
            placeHolder={'comma-separated list of topics'}
            value={this.state.topics}
            onDOMChange={e => this.setState({ topics: e.target.value })}
          />
        </FormField>
        <Footer pad={{ vertical: 'medium' }}>
          <Button
            label={'Publish Event'}
            type={'submit'}
            primary
            onClick={(e) => {
              e.preventDefault();
              const event = {
                title: this.state.title,
                duration: this.state.duration.value,
                date: this.state.date,
                topics: this.state.topics.split(',').map(st => st.trim()),
                location: this.state.location,
                description: this.state.description,
              };
              createEvent(event);
              this.setState(EMPTY_FORM);
            }}
          />
        </Footer>
      </Form>);
  }
}

NewEventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
};

export default NewEventForm;
