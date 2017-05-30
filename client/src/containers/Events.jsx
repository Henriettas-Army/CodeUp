import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layer from 'grommet/components/Layer';
import AddIcon from 'grommet/components/icons/base/Add';
import Anchor from 'grommet/components/Anchor';

import EventsList from '../components/EventsList';
import eventActions from '../../redux/actions/eventActions';
import NewEventForm from '../components/NewEventForm';


class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showForm: false };
  }

  componentDidMount() {
    this.props.loadEvents();
  }

  render() {
    const events = this.props.events.filter(e => e.title.includes(this.props.searchQuery));
    const status = this.props.status;
    const createEvent = this.props.createEvent;
    const deleteEvent = this.props.deleteEvent;
    const isAuthenticated = this.props.isAuthenticated;

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

        <EventsList
          events={events}
          status={status}
          deleteEvent={deleteEvent}
          isAuthenticated={isAuthenticated}
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
};

const mapStateToProps = state => ({
  events: state.events.events,
  searchQuery: state.search.searchQuery,
  status: state.events.status,
  isAuthenticated: state.auth.isAuthenticated,
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

export default connect(mapStateToProps, mapDispatchToProps)(Events);
