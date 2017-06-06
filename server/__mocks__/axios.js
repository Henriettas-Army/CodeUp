const fs = require('fs');

const axios = {
  get: url => new Promise((resolve, reject) => {
    if (url.includes('client_id')) {
      resolve({ data: 'access_token=56a3ffa6696b036342a7df263bc0a25338e98622&scope=repo%2Cuser&token_type=bearer' });
    } else if (url.includes('access_token=')) {
      fs.readFile('../__mockData__/techmexdev.json', 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data));
      });
    }
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
