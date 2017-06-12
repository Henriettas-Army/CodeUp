const chatDB = require('../../db/controllers/chatController');

const ChatRooms = function () {
  this.sockets = {}; // user -> socket
  this.users = {}; // socket.id -> user
  this.rooms = {}; // user -> rooms
};

ChatRooms.prototype.openRoom = function (username, room1) {
  const room = room1.split('#').sort().join('#');
  if (!this.rooms[username]) {
    this.rooms[username] = {};
  }
  this.rooms[username][room] = true;
};

ChatRooms.prototype.closeRoom = function (username, room1) {
  const room = room1.split('#').sort().join('#');
  if (this.rooms[username]) {
    this.updateLastConnection(username, room, Date.now())
      .then(() => {
        console.log('successfully completed updateLasConnection. ', username, room);
      })
      .catch((e) => {
        console.log('error closing room updating in db ', e);
      });
    delete this.rooms[username][room];
  }
};

ChatRooms.prototype.updateUserLastVisits = function (socket) {
  const user = this.users[socket.id];
  const lastVisit = Date.now();
  if (this.rooms[user]) {
    const rooms = Object.keys(this.rooms[user]);
    for (let j = 0; j < rooms.length; j += 1) {
      const room = rooms[j];
      this.updateLastConnection(user, room, lastVisit);
    }
  }
};

ChatRooms.prototype.addMessage = function (room, from, date, message) {
  room.split('#').forEach((username) => {
    if (this.sockets[username]) {
      this.sockets[username].join(room);
    }
  });
  chatDB.saveMessage({ room, from, date, message });
};

ChatRooms.prototype.getSocket = function (user) {
  return this.sockets[user];
};

ChatRooms.prototype.getUser = function (socket) {
  return this.users[socket.id];
};

ChatRooms.prototype.addUser = function (user, socket) {
  this.sockets[user] = socket;
  this.users[socket.id] = user;
};

ChatRooms.prototype.removeUser = function (socket) {
  const user = this.users[socket.id];
  delete this.sockets[user];
  delete this.users[socket.id];
};

ChatRooms.prototype.getMessagesForRoom = function (room1) {
  const room = room1.split('#').sort().join('#');
  return chatDB.getRoomMessages(room);
};

ChatRooms.prototype.getRooms = function (username) {
  return chatDB.getUnreadMessages(username);
};

ChatRooms.prototype.updateLastConnection = function (username, room, date) {
  return chatDB.updateLastConnection(username, room.split('#').sort().join('#'), date)
    .then(() => chatDB.getLastConnection(username, room))
    .then(res => console.log('last connection: ', res));
};

ChatRooms.prototype.getUnreadMessages = function (username, room) {
  return chatDB.getUnreadMessages(username, room.split('#').sort().join('#'));
};

module.exports = ChatRooms;
