const fs = require('fs');

const UserController = {
  getUserInfo: username => new Promise((resolve, reject) => {
    fs.readFile(`../__mockData__/${username}.json`, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  }),
};

module.exports = UserController;
