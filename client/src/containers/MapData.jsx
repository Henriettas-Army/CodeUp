/* global navigator */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import EventsList from '../components/EventsList';
import eventActions from '../../redux/actions/eventActions';

const style = {
  height: '800px',
  width: '100%',
};
const EventStyle = {
  width: '350px',
  height: '800px',
  overflow: 'hidden',
  'overflow-y': 'scroll',
};
const getUserPos = () => {
  let pos = null;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
  }
  return pos || [30.2672, -97.7431];
};

const latLngevt = address => (
  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => ({ lat, lng }))
    .catch(err => console.log(err))
);

class MapData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locations: [] };
  }

  componentWillMount() {
    const events = this.props.events;
    this.getPosition(events);
  }

  getPosition(events) {
    const eventlocale = [];
    Promise.all(events.map(evt => (
      latLngevt(evt.location[0])
      .then((resp) => {
        const obj = {};
        const date = new Date(evt.date);
        obj.title = evt.title;
        obj.private = evt.private;
        obj.address = evt.location[0];
        obj._id = evt._id;
        obj.time = `${date.toDateString()} @ ${date.toTimeString().split(' ')[0].slice(0, 5)}`;
        obj.lat = resp.lat;
        obj.lng = resp.lng;
        eventlocale.push(obj);
      })
    ))).then(() => {
      this.setState({ locations: eventlocale });
    });
  }

  render() {
    const events = this.props.events.filter(e =>
      e.title.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      e.username.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      JSON.stringify(e.location).toLowerCase().includes(this.props.searchQuery.toLowerCase()) ||
      JSON.stringify(e.topics).toLowerCase().includes(this.props.searchQuery.toLowerCase())
    );

    return (
      <Split
        flex="left"
        style={{ height: '800px', overflow: 'hidden' }}
        pad="none"
      >
        <Box
          style={{ height: '800px' }}
          pad="none"
        >
          <Map style={style} center={getUserPos()} zoom={15}>
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {this.state.locations.map((event) => {
              if (!event.private) {
                return (
                  <Marker key={event.title} position={[event.lat, event.lng]}>
                    <Popup>
                      <span>{event.title}<br />
                        {event.address}<br />
                        {event.time}
                      </span>
                    </Popup>
                  </Marker>
                );
              }
              return (<div visibility="hidden">Private Event</div>);
            }
            )}
          </Map>
        </Box>
        <Sidebar
          style={EventStyle}
        >
          <Box
            style={{ height: '800px' }}
            pad="none"
            wrap="true"
          >
            <EventsList
              style={{ height: '800px' }}
              events={events}
              status={this.props.status}
              deleteEvent={this.props.deleteEvent}
              isAuthenticated={this.props.isAuthenticated}
            />
          </Box>
        </Sidebar>
      </Split>
    );
  }
}

MapData.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
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
  deleteEvent: (id) => {
    dispatch(eventActions.deleteEventAsync(id));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MapData);
