const Event = require('../models/Event');

module.exports = {
  addEvent: (evt, username) => {
    const newEvt = new Event(
      Object.assign({}, evt, { username, date: new Date(evt.date), pinned: [] })
    );
    return newEvt.save();
  },

  getEvents: () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return Event.find({ date: { $gte: yesterday } });
  },

  deleteEvent: id => Event.remove({ _id: id }),

  getAnEvent: id => (
    Event.findOne({ _id: id })
  ),

  updateEvent: (id, data) => (
    Event.findOneAndUpdate({ _id: id }, data)
  ),
};
