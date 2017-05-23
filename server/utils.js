const requestP = require('request-promise');
const githubPagination = require('github-pagination');
const Promise = require('bluebird');

const GITHUB_TOKEN = 'ed13d761ab8c2e44ca251db65fc0e679e12115c6';

const traversePages = (page, remainingPages, repos, username) => (
  new Promise((resolve, reject) => {
    requestP({
      uri: `https://api.github.com/users/${username}/repos`,
      qs: {
        access_token: GITHUB_TOKEN,
        orderby: 'updated_at',
        page,
        per_page: 5,
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

const gitUserInfo = (username) => {
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
    const userObj = {
      username: userInfo.login,
      img: userInfo.avatar_url,
      name: userInfo.name,
      location: userInfo.location.split(', '),
      repo_num: userInfo.public_repos,
    };
    return userObj;
  })
  .catch((err) => {
    console.log(err);
  });
};

const gitUserRepos = username => (
  new Promise((resolve, reject) => {
    let userRepos;
    requestP({
      uri: `https://api.github.com/users/${username}/repos`,
      qs: {
        access_token: GITHUB_TOKEN,
        orderby: 'updated_at',
        page: 1,
        per_page: 5,
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
          console.log('finalfinal repos', finalRepos.length);
          resolve(finalRepos);
        });
      }
    })
    .catch((err) => {
      reject(err);
    });
  })
);

const getFourReposInfo = (allRepos) => {
  let topFour;
  const starred = allRepos.slice().sort((a, b) => (
    b.stargazers_count - a.stargazers_count
  ));
  if (starred[0].stargazer_count > 0) {
    topFour = starred.slice(0, 4);
  } else {
    topFour = allRepos.slice(0, 4);
  }
  topFour.map();
};

module.exports = {
  traversePages,
  gitUserRepos,
  getFourReposInfo,
  gitUserInfo,
};
