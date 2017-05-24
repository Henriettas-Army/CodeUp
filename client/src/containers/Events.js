import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import EventsList from '../components/EventsList';
import eventActions from '../../redux/actions/eventActions';

class Events extends React.Component {
  componentDidMount() {
    this.props.loadEvents();
  }

  render() {
    console.log('rendering events', this.props.events);

    const events = this.props.events;
    const status = this.props.status;
    const createEvent = this.props.createEvent;

    let title;
    let date;
    return (
      <div>
        <EventsList events={events} status={status} />
        <h1>Create Event...</h1>
        <form action="">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            ref={(n) => { title = n; }}
          />
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            name="date"
            ref={(n) => { date = n;}}
          />
          <input
            type="submit"
            name="submit"
            value="Create"
            onClick={(e) => {
              e.preventDefault();
              const event = {
                title: title.value,
                date: date.value,
              };
              title.value = '';
              date.value = '';
              createEvent(event);
            }}
          />
        </form>
      </div>
    );
  }
};



Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  createEvent: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return ({
  // createEvent: eventActions.postEvent,
    events: state.events.events,
    status: state.events.status,
  });
};

const mapDispatchToProps = dispatch => ({
  createEvent: url => dispatch(eventActions.postEventAsync(url)),
  loadEvents: url => {
    console.log('loading Events');
    dispatch(eventActions.loadEventsAsync(url));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);

/*
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import EventsList from '../components/EventsList';
import eventActions from '../../redux/actions/eventActions';


class Events extends React.Component {

  componentDidMount() {
    this.props.loadEvents();
    console.log('load Events in events.js: ', this.props.loadEvents());
  }

  render() {
    console.log('props: ', this.props)
    const events = this.props.events;
    const status = this.props.status;
    const createEvent = this.props.createEvent;

    console.log('rendering events: ', events)

    let title;
    let date;
    return (
      <div>
        <h1>Create Event...</h1>
        <form action="">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            ref={(n) => { title = n; }}
          />
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            name="date"
            ref={(n) => { date = n; }}
          />
          <input
            type="submit"
            name="submit"
            value="Create"
            onClick={(e) => {
              e.preventDefault();
              const event = {
                title: title.value,
                date: date.value,
              };
              title.value = '';
              date.value = '';
              createEvent(event);
            }}
          />
        </form>
        <EventsList events={events} status={status} />
      </div>
    );
  }
}



Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  createEvent: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // createEvent: eventActions.postEvent,
  events: state.events.events,
  status: state.events.status,
});

const mapDispatchToProps = dispatch => ({
  createEvent: () => dispatch(eventActions.postEventAsync()),
  loadEvents: () => dispatch(eventActions.loadEventsAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
*/
