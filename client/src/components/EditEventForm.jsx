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
import TrashIcon from 'grommet/components/icons/base/Trash';
import Anchor from 'grommet/components/Anchor';
import Section from 'grommet/components/Section';

class EditEventForm extends React.Component {

  constructor(props) {
    super(props);
    console.log('TOPICS:', this.props.editingEvent.topics.join(', '));
    console.log('EVENTS:', this.props.editingEvent.location.join(''));
    this.state = {
      id: this.props.editingEvent.id,
      title: this.props.editingEvent.title,
      date: this.props.editingEvent.date,
      description: this.props.editingEvent.description,
      duration: this.props.editingEvent.duration,
      location: this.props.editingEvent.location.join(''),
      topics: this.props.editingEvent.topics.join(', '),
      private: this.props.editingEvent.private,
    };
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
        console.log(new google.maps.places.Autocomplete(input, options));
      });
    }
  }
  handleSelect(address) {
    console.log('Im SELECTING!', address);
    this.setState({
      location: address,
    });
  }

  handleChange(address) {
    console.log('Im change GTFO!', address);
    this.setState({
      address,
    });
  }

  render() {
    const editEvent = this.props.editEvent;

    return (
      <Form>
        <Heading align="center">Edit Event</Heading>
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
            value={this.state.location}
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
            label={'Update'}
            type={'submit'}
            primary
            onClick={(e) => {
              e.preventDefault();
              const event = {
                id: this.state.id,
                title: this.state.title,
                username: window.localStorage.getItem('token'),
                duration: this.state.duration.value,
                date: this.state.date,
                topics: this.state.topics.split(',').map(st => st.trim()),
                location: document.querySelector('#places').value,
                description: this.state.description,
                private: this.state.private,
              };
              editEvent(event);
              // this.setState(EMPTY_FORM);
              this.props.onSubmit();
            }}
          />
          <br /><br />
          <Anchor
            icon={<TrashIcon />}
            animateIcon
            label={'Delete this event'}
            onClick={(e) => {
              e.preventDefault();
              this.props.deleteEvent(this.props.editingEvent.id);
              this.props.onSubmit();
            }}
          />
          <p>*Private events will not publicly display the location</p>
        </Section>
      </Form>);
  }
}

EditEventForm.propTypes = {
  editEvent: PropTypes.func.isRequired,
  editingEvent: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    username: PropTypes.string,
    duration: PropTypes.string,
    date: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    private: PropTypes.bool,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default EditEventForm;
