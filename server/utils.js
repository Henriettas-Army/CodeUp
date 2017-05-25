const axios = require('axios');
const githubPagination = require('github-pagination');
const UserController = require('./../db/controllers/UserController');

// uncomment when using tokens, including lines 16, 57, 91;
// need to save github token into DB
// const GITHUB_TOKEN = '';

const config = {
  headers: {
    'User-Agent': 'CodeUp',
  },
};

// if user has over 100 repos then traverse through remaining repos pages
// with Github API
const traversePages = (page, remainingPages, repos, username) => (
  new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        // access_token: ghToken,
        sort: 'pushed',
        direction: 'desc',
        page,
        per_page: 100,
      },
      config,
    })
    .then((resp) => {
      let totalRepos = repos.concat(resp.data);
      let newPage;
      let nowRemainingPages;

      if (remainingPages > 0) {
        newPage = page + 1;
        nowRemainingPages = remainingPages - 1;
        traversePages(newPage, nowRemainingPages, totalRepos, username)
        .then((recurseRepos) => {
          totalRepos = recurseRepos;
          resolve(totalRepos);
        })
        .catch((error) => {
          reject(error);
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

// grab all of user's repos
                    // parameters should be (username, ghToken)
const gitUserRepos = username => (
  new Promise((resolve, reject) => {
    let userRepos;
    axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        // access_token: ghToken,
        sort: 'pushed',
        direction: 'desc',
        page: 1,
        per_page: 100,
      },
      config,
    })
    .then((response) => {
      userRepos = response.data;
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
      } else {
        resolve(userRepos);
      }
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

const grabUserReposandSave = (username, ghToken) => {
  gitUserRepos(username, ghToken)
    .then((allRepos) => {
      console.log(allRepos.length);
      const fourRepos = getFourReposInfo(allRepos);
      UserController.postRepos(username, fourRepos);
    })
    .catch((error) => {
      console.log('Error grabbing user repos ', error);
    });
};

module.exports = {
  traversePages,
  gitUserRepos,
  getFourReposInfo,
  grabUserReposandSave,
};
