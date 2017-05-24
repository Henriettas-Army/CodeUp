const requestP = require('request-promise');
const githubPagination = require('github-pagination');
const Promise = require('bluebird');
const UserController = require('./../db/controllers/UserController');

const GITHUB_TOKEN = 'ed13d761ab8c2e44ca251db65fc0e679e12115c6';

// if user has over 100 repos then traverse through remaining repos pages
// with Github API
const traversePages = (page, remainingPages, repos, username) => (
  new Promise((resolve, reject) => {
    requestP({
      uri: `https://api.github.com/users/${username}/repos`,
      qs: {
        access_token: GITHUB_TOKEN,
        sort: 'updated',
        direction: 'desc',
        page,
        per_page: 100,
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
      resolveWithFullResponse: true,
    })
    .then((resp) => {
      let totalRepos = repos.concat(resp.body);
      let newPage;
      let nowRemainingPages;

      if (remainingPages > 0) {
        newPage = page + 1;
        nowRemainingPages = remainingPages - 1;
        traversePages(newPage, nowRemainingPages, totalRepos, username)
        .then((recurseRepos) => {
          totalRepos = recurseRepos;
          resolve(totalRepos);
        });
      } else {
        resolve(totalRepos);
      }
    })
    .catch((err) => {
      reject(err);
    });
  })
);

// grab user information from Github user profile
const gitUserInfo = username => (
  new Promise((resolve, reject) => {
    requestP({
      uri: `https://api.github.com/users/${username}`,
      qs: {
        access_token: GITHUB_TOKEN,
      },
      headers: {
        'User-Agent': 'CodeUp',
      },
      json: true,
    })
    .then((userInfo) => {
      const location = userInfo.location === null ? [] : userInfo.location.split(', ');
      const bio = userInfo.bio === null ? '' : userInfo.bio;
      const name = userInfo.name === null ? '' : userInfo.name;
      const userObj = {
        username: userInfo.login,
        img: userInfo.avatar_url,
        repos: [],
        name,
        bio,
        location,
      };
      resolve(userObj);
    })
    .catch((err) => {
      reject(err);
    });
  })
);

// grab all of user's repos
const gitUserRepos = username => (
  new Promise((resolve, reject) => {
    let userRepos;
    requestP({
      uri: `https://api.github.com/users/${username}/repos`,
      qs: {
        access_token: GITHUB_TOKEN,
        sort: 'pushed',
        direction: 'desc',
        page: 1,
        per_page: 100,
      },
      headers: {
        'User-Agent': 'CodeUp',
      },
      json: true,
      resolveWithFullResponse: true,
    })
    .then((response) => {
      userRepos = response.body;
      if (response.headers.link) {
        const pagesObj = githubPagination.parser(response.headers.link);
        const last = +pagesObj.last;
        const pageNum = +pagesObj.next;

        traversePages(pageNum, last - pageNum, userRepos, username)
        .then((finalRepos) => {
          resolve(finalRepos);
        })
        .catch((error) => {
          reject(error);
        });
      }
      resolve(userRepos);
    })
    .catch((err) => {
      reject(err);
    });
  })
);

// sort through all users repos and grabs top four based on stargazers_count
// or if no stargazers for any repos--> grab based on most recent pushed
const getFourReposInfo = (allRepos) => {
  let topFour;
  const starred = allRepos.slice().sort((a, b) => (
    b.stargazers_count - a.stargazers_count
  ));
  if (starred[0].stargazers_count > 0) {
    topFour = starred.slice(0, 4);
  } else {
    topFour = allRepos.slice().slice(0, 4);
  }
  return topFour.map(repo => (
    JSON.stringify({
      name: repo.name,
      description: repo.description,
      language: repo.language,
    })
  ));
};

const grabUserInfoandSave = (username) => {
  gitUserInfo(username)
  .then((user) => {
    gitUserRepos(username)
    .then((allRepos) => {
      const userObj = Object.assign({}, user);
      userObj.repos = getFourReposInfo(allRepos);
      UserController.postUser(userObj);
    })
    .catch((error) => {
      console.log('Error grabbing user repos ', error);
    });
  })
  .catch((err) => {
    console.log('Error grabbing user info ', err);
  });
};

grabUserInfoandSave('cdcjj');

module.exports = {
  traversePages,
  gitUserRepos,
  getFourReposInfo,
  gitUserInfo,
  grabUserInfoandSave,
};
