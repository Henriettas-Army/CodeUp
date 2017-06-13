/* global google document navigator, window */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'grommet/components/Select';
import DateTime from 'grommet/components/DateTime';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import CheckBox from 'grommet/components/CheckBox';
import SearchInput from 'grommet/components/SearchInput';
import Section from 'grommet/components/Section';
import '../styles/events.scss';

const EMPTY_FORM = {
  title: '',
  date: new Date(),
  description: '',
  duration: '',
  location: 'Austin, Tx',
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
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const options = new google.maps.LatLngBounds(
          new google.maps.LatLng(position.coords.latitude + 10, position.coords.longitude - 10),
          new google.maps.LatLng(position.coords.latitude - 10, position.coords.longitude + 10));
        const input = document.getElementById('places');
        /* eslint-disable no-new */
        new google.maps.places.Autocomplete(input, options);
        /* eslint-enable no-new */
      },
      (error) => {
        const defaultLatLng = { lat: 30.2672, lng: -97.7431 };
        if (error.code === error.PERMISSION_DENIED) {
          const options = new google.maps.LatLngBounds(
            new google.maps.LatLng(defaultLatLng.lat + 10, defaultLatLng.lng - 10),
            new google.maps.LatLng(defaultLatLng.lat - 10, defaultLatLng.lng + 10));
          const input = document.getElementById('places');
          /* eslint-disable no-new */
          new google.maps.places.Autocomplete(input, options);
          /* eslint-disable no-new */
        }
      });
    }
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

    return (
      <Form className="eventForm" style={{ padding: '7px 7px', margin: '7px 7px' }}>
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
          <SearchInput
            id="places"
            onDOMChange={e => this.setState({ location: e.target.value })}
            placeHolder="Find Location"
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
        <Section basis={'small'} align={'center'}>
          <Button
            label={'Create'}
            style={{ backgroundColor: '#2E8C65', borderStyle: 'none', color: 'white' }}
            type={'submit'}
            primary
            onClick={(e) => {
              e.preventDefault();
              if (this.state.title.length === 0) {
                document.querySelector('.eventForm').prepend('Event Must Contain A Title');
                return;
              }
              const event = {
                title: this.state.title,
                username: window.localStorage.getItem('token'),
                duration: this.state.duration.value,
                date: this.state.date,
                topics: this.state.topics.split(',').map(st => st.trim()),
                location: document.querySelector('#places').value,
                description: this.state.description,
                private: this.state.private,
              };
              createEvent(event);
              this.setState(EMPTY_FORM);
              this.props.onSubmit();
            }}
          />
          <p>*Private events will not publicly display the location</p>
        </Section>
      </Form>);
  }
}

NewEventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewEventForm;
