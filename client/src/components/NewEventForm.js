import React from 'react';
import PropTypes from 'prop-types';

class NewEventForm extends React.Component {

  // it might become a stateful component in the future
  render() {
    const createEvent = this.props.createEvent;

    let title;
    let date;
    let description;
    let duration;
    let location;
    let topics;

    return (<form action="">
      <label htmlFor="title">Title: </label>
      <input type="text" name="title" ref={(n) => { title = n; }} />

      <label htmlFor="date">Date: </label>
      <input type="date" name="date" ref={(n) => { date = n; }} />

      <label htmlFor="description">Description</label>
      <input type="text" name="description" ref={(n) => { description = n; }} />

      <label htmlFor="location">Location</label>
      <input type="text" name="location" ref={(n) => { location = n; }} />

      <label htmlFor="duration">About how long do you think it will last?</label>
      <select name="duration" value={duration}>
        <option value="undefined">Select one...</option>
        <option value="Less than 1 hour">Less than an hour</option>
        <option value="1-2 hours">1-2 hours</option>
        <option value="2-3 hours">2-3 hours</option>
        <option value="More than 3 hours">More than 3 hours</option>
      </select>

      <label htmlFor="topics">Topics (Comma separated)</label>
      <input type="text" name="topics" ref={(n) => { topics = n; }} />

      <input
        type="submit"
        name="submit"
        value="Create"
        onClick={(e) => {
          e.preventDefault();
          const event = {
            title: title.value,
            date: date.value,
            topics: topics.value.split(','),
            location: location.value,
            description: description.value,
          };
          title.value = '';
          date.value = '';
          createEvent(event);
        }}
      />
    </form>);
  }
}

NewEventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
};
