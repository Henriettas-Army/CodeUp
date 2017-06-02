import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Layer from 'grommet/components/Layer';
import AddIcon from 'grommet/components/icons/base/Add';
import Anchor from 'grommet/components/Anchor';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import EventsList from '../components/EventsList';
import eventActions from '../../redux/actions/eventActions';
import NewEventForm from '../components/NewEventForm';


class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      calendar: null,
    };
    this.handleCalendarDate = this.handleCalendarDate.bind(this);
  }

  componentDidMount() {
    this.props.loadEvents();
  }

  handleCalendarDate(date) {
    this.setState({
      calendar: date
    });
  }

  render() {
    let calendarFilteredEvents;
    // let calendarFilteredEvents;
    // this.state.calendar ? const calendarEvents = this.props.events.map(e =>
    //   console.log(e.date));
    //   console.log
    if (this.state.calendar) {
      calendarFilteredEvents = this.props.events.filter(e =>
      e.date.split('T')[0].replace(/-/g, '') >= this.state.calendar.format().split('T')[0].replace(/-/g, ''));
      console.log('EVENT!!!!:', this.props.events[0].date.split('T')[0].replace(/-/g, ''), this.state.calendar.format().split('T')[0].replace(/-/g, ''));
    } else {
      calendarFilteredEvents = this.props.events;
    }
    const events = calendarFilteredEvents.filter(e =>
      e.title.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      e.username.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      JSON.stringify(e.location).toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      JSON.stringify(e.topics).toLowerCase().includes(this.props.searchQuery.toLowerCase())
    );
    const status = this.props.status;
    const createEvent = this.props.createEvent;
    const deleteEvent = this.props.deleteEvent;
    const isAuthenticated = this.props.isAuthenticated;
    const errMessage = this.props.errMessage;

    return (
      <div>
        <Anchor
          icon={<AddIcon />}
          label={'Add Event'}
          onClick={(e) => { e.preventDefault(); this.setState({ showForm: true }); }}
        />
        {
          this.state.showForm &&
          <Layer
            closer
            flush
            onClose={() => { this.setState({ showForm: false }); }}
          >
            <NewEventForm
              createEvent={createEvent}
              onSubmit={() => { this.setState({ showForm: false }); }}
              isAuthenticated={isAuthenticated}
            />
          </Layer>
        }
        <br /><br /><br />
        <p>Filter events by date:</p>
        <DatePicker
          todayButton="Today"
          selected={this.state.calendar}
          placeholderText="Select a date here"
          onChange={this.handleCalendarDate}
          isClearable
        />
        <br />
        <EventsList
          events={events}
          status={status}
          deleteEvent={deleteEvent}
          isAuthenticated={isAuthenticated}
          errMessage={errMessage}
        />
      </div>
    );
  }
}

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  createEvent: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  errMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  events: state.events.events,
  searchQuery: state.search.searchQuery,
  status: state.events.status,
  isAuthenticated: state.auth.isAuthenticated,
  errMessage: state.events.error,
});

const mapDispatchToProps = dispatch => ({
  createEvent: url => dispatch(eventActions.postEventAsync(url)),
  loadEvents: (url) => {
    dispatch(eventActions.loadEventsAsync(url));
  },
  deleteEvent: (id) => {
    dispatch(eventActions.deleteEventAsync(id));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));
