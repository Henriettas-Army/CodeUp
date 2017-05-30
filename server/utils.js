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
// const traversePages = (page, remainingPages, repos, username) => (
const traversePages = (page, remainingPages, repos, username, ghToken) => (
  new Promise((resolve, reject) => {
    axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        access_token: ghToken,
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
        traversePages(newPage, nowRemainingPages, totalRepos, username, ghToken)
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
// const gitUserRepos = username => (
const gitUserRepos = (username, ghToken) => (
  new Promise((resolve, reject) => {
    let userRepos;
    axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        access_token: ghToken,
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
      stargazers_count: repo.stargazers_count,
    })
  ));
};

const getLanguageData = (repo, ghToken) => (
  new Promise((resolve, reject) => {
    axios.get(repo.languages_url, { params: { access_token: ghToken }, config })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
  })
);

const asyncLanguageData = (allRepos, ghToken) => (
  new Promise((resolve, reject) => {
    const languageArr = [];
    Promise.all(allRepos.map(repo => (
      getLanguageData(repo, ghToken)
      .then((res) => {
        languageArr.push(res);
      })
      .catch((err) => {
        console.log(err);
      })
    )))
    .then(() => {
      resolve(languageArr);
    })
    .catch((err) => {
      reject(err);
    });
  })
);

const grabUserReposandSave = (username, ghToken) => {
  gitUserRepos(username, ghToken)
    .then((allRepos) => {
      new Promise((resolve, reject) => {
        asyncLanguageData(allRepos, ghToken)
        .then((languageArr) => {
          resolve(languageArr);
        })
        .catch((err) => {
          reject(err);
        });
      })
      .then((languageArr) => {
        const languageObj = {};
        const languageData = [];
        languageArr.forEach((repo) => {
          const keys = Object.keys(repo);
          console.log('KEYS', keys);
          for (let i = 0; i < keys.length; i += 1) {
            if (languageObj[keys[i]]) {
              languageObj[keys[i]] += repo[keys[i]];
            } else {
              languageObj[keys[i]] = repo[keys[i]];
            }
          }
        });
        const keys = Object.keys(languageObj);
        for (let i = 0; i < keys.length; i += 1) {
          const language = {};
          language.label = keys[i];
          language.value = languageObj[keys[i]];
          languageData.push(language);
        }
        console.log('LANGUAGE DATA:', languageData);
        const fourRepos = getFourReposInfo(allRepos);
        UserController.postRepos(username, fourRepos, languageData);
      });
    })
    .catch((error) => {
      console.log('Error grabbing user repos ', error);
    });
};

const grabUserInfo = (username, req, res) => {
  UserController.getUserInfo(username)
  .then((resp) => {
    if (!resp) {
      res.status(200).json({ ok: false, user: null });
      return;
    }
    const profile = Object.assign({}, { resp });
    profile.resp.access_token = '';
    res.status(200).json({ ok: true, user: profile.resp });
  })
  .catch((err) => {
    res.status(200).json({ ok: false, err });
  });
};

module.exports = {
  traversePages,
  gitUserRepos,
  getFourReposInfo,
  grabUserReposandSave,
  grabUserInfo,
};
