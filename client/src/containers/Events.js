import React, { PropTypes } from 'react';
import EventsList from '../components/EventsList';
import eventActions from '../../actions/eventActions';

let Events = ({ events, status, createEvent }) => {

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

    </div>
  );
};

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  createEvent: PropTypes.func.isRequired,
};

let mapStateToProps = (state, ownProps) {
  return {
    createEvent: eventActions.postEvent,
    events:state.events.events,
    status: state.events.status
  }
};

let mapDispatchToProps = (dispatch) => {
  return  {
    createEvent: (url) => dispatch(eventActions.postEventAsync(url)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);