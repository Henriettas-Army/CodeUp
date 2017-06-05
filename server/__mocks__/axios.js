const fs = require('fs');

const axios = {
  get: url => new Promise((resolve, reject) => {
    const noRepos = url.slice(0, url.lastIndexOf('/'));
    const lastSlash = noRepos.lastIndexOf('/');
    const userID = noRepos.substring(lastSlash + 1);
    fs.readFile(`../__mockData__/${userID}.json`, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  }),
};

module.exports = axios;
