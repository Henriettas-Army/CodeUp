/* eslint-env jest */

const utils = require('../utils');

jest.mock('../__mocks__/axios');
jest.mock('../__mocks__/UserController');

describe('profile handlers', () => {
  it('gitUserRepos() should return user repos', () => {
    utils.gitUserRepos('cdcjj')
    .then((response) => {
      expect(response.data).toBeDefined();
      expect(response.data[0].owner.login).toEqual('cdcjj');
    });
  });

  it('traversePages() should concat repos from remaining pages', () => {
    utils.gitUserRepos('JeffRiesberg1')
    .then((response) => {
      utils.traversePages(2, 0, response, 'JeffRisberg2')
      .then((resp) => {
        expect(resp.length).toBe(162);
      });
    });
  });

  it('getFourReposInfo() should get filter for four user repos based on stargazers', () => {
    utils.gitUserRepos('cdcjj')
    .then((allRepos) => {
      const fourRepos = utils.getFourReposInfo(allRepos);
      expect(fourRepos.length).toBe(4);
      expect(fourRepos[0].name).toEqual('CodeUp');
      expect(fourRepos[2].name).toEqual('Echoes');
    });
  });
});
