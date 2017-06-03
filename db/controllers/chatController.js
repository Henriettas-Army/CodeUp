const Message = require('../models/Message');
const LastConnection = require('../models/LastConnection');

module.exports = {
  saveMessage: (message) => {
    const msg = new Message(message);

    msg.save().catch((e) => { console.log('error saving msg', msg, e, 'too bad :`('); console.log(msg, message); });
  },
  getRoomMessages: room => Message.find({ room }),
  updateLastConnection: (username, room, date) => LastConnection.findOneAndUpdate(
    { username, room },
    { username, room, date },
    { upsert: true }
  ),
  getLastConnection: (username, room) => LastConnection.findOne({ username, room }),
  getUnreadMessages: username => (
    // LastConnection.find().then((results) => {
    //   console.log('LastCOnnection table@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:');
    //   console.log(results);
    // });

    LastConnection.find({ username }).then((results) => {
      const promises = []; // = [{room: 'gjblanco', unread: 0}];
      for (let i = 0; i < results.length; i += 1) {
        const j = i;
        promises.push(
          Message.count({
            room: results[j].room,
            date: { $gt: results[j].date },
          })
          .then(count => (
            { room: results[j].room, unread: count }
          ))
        );
      }
      return Promise.all(promises);
    }) // there should be a catch here
  )
};
