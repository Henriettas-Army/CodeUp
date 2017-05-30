const Event = require('../models/Event');

module.exports = {
  addEvent: (evt) => {
    const newEvt = new Event(Object.assign({}, evt, { date: new Date(evt.date) }));
    return newEvt.save();
  },

  getEvents: () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return Event.find({ date: { $gte: yesterday } });
  },

  deleteEvent: id => Event.remove({ _id: id }),
};
