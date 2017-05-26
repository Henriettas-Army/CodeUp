import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import EventsList from '../components/EventsList';
import eventActions from '../../redux/actions/eventActions';
import NewEventForm from '../components/NewEventForm';

class Events extends React.Component {
  componentDidMount() {
    this.props.loadEvents();
  }

  render() {
    const events = this.props.events;
    const status = this.props.status;
    const createEvent = this.props.createEvent;
    const deleteEvent = this.props.deleteEvent;

    return (
      <div>
        <EventsList events={events} status={status} deleteEvent={deleteEvent} />
        <h1>Create Event...</h1>
        <NewEventForm createEvent={createEvent} />
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
};

const mapStateToProps = state => ({
// createEvent: eventActions.postEvent,
  events: state.events.events,
  status: state.events.status,
});

const mapDispatchToProps = dispatch => ({
  createEvent: url => dispatch(eventActions.postEventAsync(url)),
  loadEvents: (url) => {
    console.log('loading Events');
    dispatch(eventActions.loadEventsAsync(url));
  },
  deleteEvent: (id) => {
    dispatch(eventActions.deleteEventAsync(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
