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
import PinIcon from 'grommet/components/icons/base/Pin';
import EditIcon from 'grommet/components/icons/base/Edit';
import Spinning from 'grommet/components/icons/Spinning';
import Status from 'grommet/components/icons/Status';
import '../styles/events.scss';

const listStyle = {
  align: 'center'
};

const EventsList = ({
  events,
  status,
  isAuthenticated,
  errMessage,
  updateEvent,
  displayEditEventForm,
  map,
}) => (
  <div>
    {status === 'LOADING' && <p className="loading">Loading ...<Spinning /></p>}
    {status === 'ERROR' && <p className="error">Error loading or posting events ... {errMessage}</p>}
    {
      <Tiles fill flush={false} style={listStyle} className="eventsList">
        {events.map(evt =>
          (<Tile key={evt._id} align={'start'} className="eventBox">
            <Card
              // className="eventBox"
              heading={<h2>{evt.title}</h2>}
              label={evt.username && evt.private ?
                <div>
                  <span><strong>*Private</strong> created by <Anchor className="eventCreator" href="#" path={`/profile/${evt.username}`}><span className="eventCreator">{evt.username}</span></Anchor></span>
                </div> :
                <span>Created by <Anchor href="#" path={`/profile/${evt.username}`}><span className="eventCreator">{evt.username}</span></Anchor></span>
              }
              description={
                <Accordion>
                  <AccordionPanel heading={<Timestamp value={evt.date} /> || 'No date provided'}>
                    <Paragraph>
                      <strong className="eventCreator">Description</strong><br />
                      {evt.description || 'No description provided for this event'}
                      <br /><br />
                      <strong className="eventCreator">Topics</strong><br />
                      {evt.topics ? evt.topics.join(', ') : 'No topics provided for this event'}
                      <br /><br />
                      <strong className="eventCreator">Location</strong><br />
                      {evt.private ? '*Please contact event creator for location' : evt.location || 'No location provided for this event'}
                      <br /><br />
                      <strong className="eventCreator">Duration</strong><br />
                      {evt.duration || 'No duration provided for this event'}
                      <br /><br /><br />
                      <PinIcon />
                      {`  Pinned by ${evt.pinned ? evt.pinned.length : 0}`}
                    </Paragraph>
                  </AccordionPanel>
                </Accordion>}
              link={!map ? (<span>
                {evt.username === isAuthenticated ?
                  <Anchor
                    onClick={() => displayEditEventForm(evt)}
                    label={<h4 className="editDeleteEvent"><EditIcon />{'Edit/Delete this event'}</h4>}
                  /> :
                  (
                    <span>
                      {JSON.stringify(evt.pinned).includes(isAuthenticated) ?
                        (<span><PinIcon colorIndex={'neutral-2-a'} /> <strong> Pinned </strong>
                          <Anchor
                            icon={<Status value="warning" />}
                            onClick={(e) => {
                              e.preventDefault();
                              updateEvent({ id: evt._id, toUpdate: [{ typeUpdate: 'unpinned', data: isAuthenticated }] });
                            }}
                            label={'Unpin'}
                          />
                        </span>)
                      : <Anchor
                        icon={<PinIcon />}
                        onClick={(e) => {
                          e.preventDefault();
                          updateEvent({ id: evt._id, toUpdate: [{ typeUpdate: 'pinned', data: isAuthenticated }] });
                        }}
                        label={'Pin this event'}
                      />
                    }
                    </span>
                )}
              </span>) : null}
            />
          </Tile>)
        )}
      </Tiles>
    }
  </div>
);

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  updateEvent: PropTypes.func.isRequired,
  displayEditEventForm: PropTypes.func,
  isAuthenticated: PropTypes.string.isRequired,
  errMessage: PropTypes.string,
  map: PropTypes.bool.isRequired,
};

EventsList.defaultProps = {
  errMessage: '',
  displayEditEventForm: undefined,
};

export default EventsList;
