import React, { PropTypes } from 'react';

const EventsList = ({ events, status }) => (<div>
  {status === 'LOADING' && <p className="loading">Loading...</p>}
  {status === 'ERROR' && <p className="error">Error loading or posting events...</p>}
  {status === 'READY' &&
    <ul>
      {events.map(evt =>
        (<li><h1>{evt.title}</h1></li>),
      )}
    </ul>
  }
</div>);

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
};

module.exports = EventsList;
