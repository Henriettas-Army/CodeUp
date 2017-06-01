const chatDB = require('../../db/controllers/chatController');

const ChatRooms = function () {
  // this.buffer = {};
  // this.messages = 0;
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

ChatRooms.prototype.updateAllLastVisits = function () {
  // console.log('come on!!!')
  const lastVisit = Date.now();
  const users = Object.keys(this.rooms);
  // console.log('users: ', users)
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    if (this.rooms[user]) {
      const rooms = Object.keys(this.rooms[user]);
      // console.log('rooms: ', rooms)
      for (let j = 0; j < rooms.length; j += 1) {
        const room = rooms[j];
        console.log('before closing: updating in ', user, room, lastVisit);
        this.updateLastConnection(user, room, lastVisit);
      }
    }
  }
};

ChatRooms.prototype.addMessage = function (room, from, date, message) {
  // this.messages += 1;
  // // save to db
  // let isNewRoom = false;
  // if (!this.buffer[room]) {
  //   this.buffer[room] = [];
  //   isNewRoom = true;
  // }
  // this.buffer[room].push({ room, from, date, message });
  room.split('#').forEach((username) => {
    console.log(username);
    if (this.sockets[username]) {
      this.sockets[username].join(room);
      console.log('username joining to room', username, room);
    }
  });
  chatDB.saveMessage({ room, from, date, message });

  // if (isNewRoom) {
  //   // connect corresponding users to new Room
  //   const users = room.split('#');
  //   for (let i = 0; i < users.length; i += 1) {
  //     const s = this.sockets[users[i]];
  //     if (s !== undefined) {
  //       s.join(room);
  //     }
  //   }
  //   console.log('new room created: ', room);
  // }
};

ChatRooms.prototype.getSocket = function (user) {
  return this.sockets[user];
};

ChatRooms.prototype.getUser = function (socket) {
  // console.log('trying to find ', socket.id);
  // for(var user in this.users) {
  //   console.log(this.users[user]);
  // }
  return this.users[socket.id];
}

ChatRooms.prototype.addUser = function (user, socket) {
  this.sockets[user] = socket;
  this.users[socket.id] = user;
  console.log('user added', user);
  // const rooms = Object.keys(this.buffer);
  // for (let i = 0; i < rooms.length; i += 1) {
  //   const userInRoom = rooms[i].split('#').indexOf(user) !== -1;
  //   if (userInRoom) {
  //     socket.join(rooms[i]);
  //   }
  // }
};

ChatRooms.prototype.removeUser = function (socket) {
  const user = this.users[socket.id];
  delete this.sockets[user];
  delete this.users[socket.id];
};

ChatRooms.prototype.getMessagesForRoom = function (room1) {
  const room = room1.split('#').sort().join('#');
  console.log('target room: ', room);
  // return this.buffer[room];
  return chatDB.getRoomMessages(room);
};

ChatRooms.prototype.getRooms = function (username) {
  // TODO return all different rooms for a given user, and the number of unread messages
  // return [{ room: 'asdf', unread: 4 }];
  return chatDB.getUnreadMessages(username);
};

ChatRooms.prototype.updateLastConnection = function (username, room, date) {
  return chatDB.updateLastConnection(username, room.split('#').sort().join('#'), date)
    .then(() => chatDB.getLastConnection(username, room))
    .then((res) => console.log('last connection: ', res));
};

ChatRooms.prototype.getUnreadMessages = function (username, room) {
  return chatDB.getUnreadMessages(username, room.split('#').sort().join('#'));
};

module.exports = ChatRooms;