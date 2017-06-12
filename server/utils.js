const axios = require('axios');
const githubPagination = require('github-pagination');
const UserController = require('./../db/controllers/UserController');
const GITHUB_API = require('./config/github');

const ID = GITHUB_API.CLIENT_ID;
const SECRET = GITHUB_API.CLIENT_SECRET;


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
    ({
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

const createLanguageDataObject = (languageArr, callback) => {
  const languageObj = {};
  const languageData = [];
  let byteCount = 0;
  languageArr.forEach((repo) => {
    const keys = Object.keys(repo);
    for (let i = 0; i < keys.length; i += 1) {
      if (languageObj[keys[i]]) {
        languageObj[keys[i]] += repo[keys[i]];
        byteCount += repo[keys[i]];
      } else {
        languageObj[keys[i]] = repo[keys[i]];
        byteCount += repo[keys[i]];
      }
    }
  });
  const keys = Object.keys(languageObj);
  for (let i = 0; i < keys.length; i += 1) {
    const language = {};
    language.label = keys[i];
    language.value = Math.round((languageObj[keys[i]] / byteCount) * 100);
    languageData.push(language);
  }
  const sortedLanguageData = languageData.sort((a, b) => b.value - a.value).splice(0, 5);
  const otherLanguageObj = {};
  otherLanguageObj.label = 'Other';
  let otherLanguageTotal = 0;
  for (let i = 0; i < languageData.length; i += 1) {
    otherLanguageTotal += languageData[i].value;
  }
  otherLanguageObj.value = otherLanguageTotal;
  if (otherLanguageObj.value > 0) {
    sortedLanguageData.push(otherLanguageObj);
  }
  let valuesTotal = 0;
  sortedLanguageData.forEach((obj) => {
    valuesTotal += obj.value;
  });
  if (valuesTotal >= 100) {
    const diff = valuesTotal - 100;
    sortedLanguageData[0].value -= diff;
  } else {
    const diff = 100 - valuesTotal;
    sortedLanguageData[0].value += diff;
  }
  callback(sortedLanguageData);
};

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
        createLanguageDataObject(languageArr, (sortedLanguageData) => {
          const fourRepos = getFourReposInfo(allRepos);
          UserController.postRepos(username, fourRepos, sortedLanguageData)
          .then((res) => {
            console.log('POST REPOS RESULT:', res);
          })
          .catch((err) => {
            console.log('ERROR WITH SORTED LANGUAGE DATA:', err);
          });
        });
      });
    })
    .catch((error) => {
      console.log('Error grabbing user repos ', error);
    });
};

const grabUserInfo = username => (
  new Promise((resolve, reject) => {
    UserController.getUserInfo(username)
    .then((resp) => {
      if (!resp) {
        reject(resp);
      }
      const profile = Object.assign({}, { resp });
      profile.resp.access_token = '';
      resolve(profile.resp);
    })
    .catch((err) => {
      reject(err);
    });
  })
);

const getAccessToken = CODE => (
  axios(`https://github.com/login/oauth/access_token?client_id=${ID}&redirect_uri=http://codeup.life/oauth_redirect&client_secret=${SECRET}&code=${CODE}`)
);

const gitHubUserInformation = TOKEN => (
  axios(`https://api.github.com/user?access_token=${TOKEN}`)
);

module.exports = {
  traversePages,
  gitUserRepos,
  getFourReposInfo,
  grabUserReposandSave,
  grabUserInfo,
  getAccessToken,
  gitHubUserInformation,
};
