/* global navigator */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const style = {
  height: '800px'
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
    getUserPos();
    this.getPosition(events);
  }

  getPosition(events) {
    const eventlocale = [];
    Promise.all(events.map(evt => (
      latLngevt(evt.location[0])
      .then((resp) => {
        const obj = {};
        obj.title = evt.title;
        obj.address = evt.location[0];
        obj.lat = resp.lat;
        obj.lng = resp.lng;
        eventlocale.push(obj);
      })
    ))).then(() => {
      this.setState({ locations: eventlocale });
    });
  }

  render() {
    return (
      <Map style={style} center={getUserPos()} zoom={13}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={getUserPos()}>
          <Popup>
            <span>You are Here!</span>
          </Popup>
        </Marker>
        {this.state.locations.map(event => (
          <Marker position={[event.lat, event.lng]}>
            <Popup>
              <span>{event.title}<br />
                {event.address}</span>
            </Popup>
          </Marker>)
        )}
      </Map>);
  }
}

MapData.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  events: state.events.events,
});

export default connect(mapStateToProps)(MapData);
