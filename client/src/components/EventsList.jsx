import React from 'react';
import PropTypes from 'prop-types';
import Card from 'grommet/components/Card';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Timestamp from 'grommet/components/Timestamp';
import Spinning from 'grommet/components/icons/Spinning';

const EventsList = ({ events, status, deleteEvent, isAuthenticated, errMessage }) => (<div>
  {status === 'LOADING' && <p className="loading">Loading ...<Spinning /></p>}
  {status === 'ERROR' && <p className="error">Error loading or posting events ... {errMessage}</p>}
  {
    <Tiles fill flush={false}>
      {events.map(evt =>
        (<Tile key={evt._id} align={'start'}>
          <Card
            heading={evt.title}
            label={evt.username && evt.private ?
              <div>
                <span><strong>*Private</strong> event created by <a href={`/profile/${evt.username}`}>{evt.username}</a></span>
              </div> :
              <span>Created by <a href={`/profile/${evt.username}`}>{evt.username}</a></span>
            }
            description={
              <Accordion>
                <AccordionPanel heading={<Timestamp value={evt.date} /> || 'No date provided for this event'}>
                  <Paragraph>
                    {evt.description || 'No description provided for this event'}
                    <br />
                    {evt.topics ? evt.topics.join(', ') : 'No topics provided for this event'}
                    <br />
                    {/* {<Timestamp value={evt.date} /> || 'No date provided for this event'}
                    <br /> */}
                    {evt.private ? '*Please contact event creator for location' : evt.location || 'No location provided for this event'}
                    <br />
                    {evt.duration || 'No duration provided for this event'}
                  </Paragraph>
                </AccordionPanel>
              </Accordion>}
            link={evt.username === isAuthenticated ?
              <Anchor
                onClick={(e) => {
                  e.preventDefault();
                  deleteEvent(evt._id);
                }}
                label={'Delete this event'}
              /> :
              null
            }
          />
        </Tile>)
      )}
    </Tiles>
  }
</div>);

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
  errMessage: PropTypes.string,
};

EventsList.defaultProps = {
  errMessage: PropTypes.string,
};

export default EventsList;
