const Position = function() {
  this.users = {}; // user -> position
};

Position.prototype.set = function (username, position) {
  if (!position) {
    delete this.users[username];
  } else {
    this.users[username] = position;
  }
};

Position.prototype.get = function (username) {
  return this.users[username];
};

const positionHelper = new Position();

module.exports = positionHelper;
