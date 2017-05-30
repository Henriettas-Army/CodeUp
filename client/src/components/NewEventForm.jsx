import React from 'react';
import PropTypes from 'prop-types';
import Select from 'grommet/components/Select';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import CheckBox from 'grommet/components/CheckBox';
import PlacesAutocomplete from 'react-places-autocomplete';

const EMPTY_FORM = {
  title: '',
  date: new Date(),
  description: '',
  duration: '',
  location: 'Austin, Tx',
  geocodeResults: null,
  topics: '',
  private: false,
};

class NewEventForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = EMPTY_FORM;
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelect(address) {
    this.setState({
      location: address,
    });
  }

  handleChange(address) {
    this.setState({
      address,
    });
  }

  render() {
    const createEvent = this.props.createEvent;
    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className="fa fa-map-marker Demo__suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: 'Search Places',
      name: 'Demo__input',
      id: 'my-input-id',
    };

    return (
      <Form>
        <Heading align="center">Create Event</Heading>
        <CheckBox
          label="Make event private*"
          checked={this.state.private}
          onChange={() => this.setState({ private: !this.state.private })}
        />
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
        <FormField label="...">
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
          <PlacesAutocomplete
            onSelect={this.handleSelect}
            onEnterKeyDown={this.handleSelect}
            autocompleteItem={AutocompleteItem}
            inputProps={inputProps}
            value={this.state.location}
            onChange={e => this.setState({ location: e.target.value })}
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
          <p>*Private events will not publicly display the location</p>
          <Button
            label={'Create'}
            type={'submit'}
            primary
            onClick={(e) => {
              e.preventDefault();
              const event = {
                title: this.state.title,
                username: this.props.isAuthenticated,
                duration: this.state.duration.value,
                date: this.state.date,
                topics: this.state.topics.split(',').map(st => st.trim()),
                location: this.state.location,
                description: this.state.description,
                private: this.state.private,
              };
              createEvent(event);
              this.setState(EMPTY_FORM);
              this.props.onSubmit();
            }}
          />
        </Footer>
      </Form>);
  }
}

NewEventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
};

export default NewEventForm;
