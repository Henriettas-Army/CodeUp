const Event = require('../models/Event');

module.exports = {
  addEvent: (evt) => {
    const newEvt = new Event(Object.assign({}, evt, { date: new Date(evt.date) }));
    return newEvt.save();
  },

  getEvents: () => Event.find({}),
};
