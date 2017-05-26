const Event = require('../models/Event');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
  addEvent: (evt) => {
    const newEvt = new Event(Object.assign({}, evt, { date: new Date(evt.date) }));
    return newEvt.save();
  },

  getEvents: () => Event.find({}),
  deleteEvent: id => Event.remove({ _id: ObjectId(id) }),
};
