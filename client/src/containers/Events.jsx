import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Layer from 'grommet/components/Layer';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import AddIcon from 'grommet/components/icons/base/Add';
import Anchor from 'grommet/components/Anchor';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import IterationIcon from 'grommet/components/icons/base/Iteration';
import MagicIcon from 'grommet/components/icons/base/Magic';
import PinIcon from 'grommet/components/icons/base/Pin';
import EventsList from '../components/EventsList';
import eventActions from '../../redux/actions/eventActions';
import NewEventForm from '../components/NewEventForm';
import EditEventForm from '../components/EditEventForm';


class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'All',
      showNewEventForm: false,
      showEditEventForm: false,
      editingEvent: null,
      calendar: null,
    };
    this.handleCalendarDate = this.handleCalendarDate.bind(this);
    this.displayEditEventForm = this.displayEditEventForm.bind(this);
  }

  componentDidMount() {
    this.props.loadEvents();
  }

  handleCalendarDate(date) {
    this.setState({
      calendar: date
    });
  }

  displayEditEventForm(event) {
    this.setState({
      showEditEventForm: true,
      editingEvent: event,
    });
  }

  render() {
    const status = this.props.status;
    const createEvent = this.props.createEvent;
    const deleteEvent = this.props.deleteEvent;
    const updateEvent = this.props.updateEvent;
    const isAuthenticated = this.props.isAuthenticated;
    const errMessage = this.props.errMessage;
    const editEvent = this.props.editEvent;
    // filter events based on what events view users choose
    let viewEvents;
    if (this.state.view === 'Created') {
      viewEvents = this.props.events.filter(e => e.username === isAuthenticated);
    } else if (this.state.view === 'Pinned') {
      viewEvents = this.props.events.filter(e =>
        JSON.stringify(e.pinned).includes(isAuthenticated));
    } else if (this.state.view === 'All') {
      viewEvents = this.props.events.slice();
    }

    // filters events based on calendar
    let calendarFilteredEvents;
    if (this.state.calendar) {
      calendarFilteredEvents = viewEvents.filter(e =>
        e.date.split('T')[0].replace(/-/g, '') >= this.state.calendar.format().split('T')[0].replace(/-/g, ''));
    } else {
      calendarFilteredEvents = viewEvents;
    }

    // filter events based on search
    const events = calendarFilteredEvents.filter(e =>
      e.title.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      e.username.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      JSON.stringify(e.location).toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      JSON.stringify(e.topics).toLowerCase().includes(this.props.searchQuery.toLowerCase())
    );

    return (
      <div>
        <Split priority={'left'} showOnResponsive={'both'} flex={'left'} fixed={false}>
          <Box pad={'medium'} align={'start'} >
            <Anchor
              icon={<AddIcon />}
              label={'Add Event'}
              onClick={(e) => { e.preventDefault(); this.setState({ showNewEventForm: true }); }}
            />
            {
              this.state.showNewEventForm &&
              <Layer
                closer
                flush
                onClose={() => { this.setState({ showNewEventForm: false }); }}
              >
                <NewEventForm
                  createEvent={createEvent}
                  onSubmit={() => { this.setState({ showNewEventForm: false }); }}
                  isAuthenticated={isAuthenticated}
                />
              </Layer>
            }
            {
              this.state.showEditEventForm &&
              <Layer
                closer
                flush
                onClose={() => { this.setState({ showEditEventForm: false }); }}
              >
                <EditEventForm
                  event={this.props.editingEvent}
                  editEvent={editEvent}
                  editingEvent={this.state.editingEvent}
                  deleteEvent={deleteEvent}
                  onSubmit={() => { this.setState({ showEditEventForm: false }); }}
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
          </Box>
          <Box pad={'medium'} align={'end'} >
            <p>
              <Anchor
                icon={<IterationIcon colorIndex={'neutral-4'} />}
                label={'All'}
                disabled={this.state.view === 'All'}
                onClick={() => this.setState({ view: 'All' })}
              />
              <Anchor
                icon={<MagicIcon colorIndex={'neutral-3'} />}
                label={'My Events'}
                disabled={this.state.view === 'Created'}
                onClick={() => this.setState({ view: 'Created' })}
              />
              <Anchor
                icon={<PinIcon colorIndex={'neutral-2-a'} />}
                label={'My Pinned'}
                disabled={this.state.view === 'Pinned'}
                onClick={() => this.setState({ view: 'Pinned' })}
              />
            </p>
          </Box>
        </Split>
        <EventsList
          events={events}
          status={status}
          updateEvent={updateEvent}
          displayEditEventForm={this.displayEditEventForm}
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
  editEvent: PropTypes.func.isRequired,
  editingEvent: PropTypes.func,
  loadEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  errMessage: PropTypes.string,
};

Events.defaultProps = {
  errMessage: '',
  editingEvent: PropTypes.func,
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
  loadEvents: url => dispatch(eventActions.loadEventsAsync(url)),
  deleteEvent: id => dispatch(eventActions.deleteEventAsync(id)),
  updateEvent: eventObj => dispatch(eventActions.updateEventsAsync(eventObj)),
  editEvent: url => dispatch(eventActions.editEventAsync(url)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));
