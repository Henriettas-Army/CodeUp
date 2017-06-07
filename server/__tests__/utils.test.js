/* eslint-env jest */
const utils = require('../utils');


describe('profile handlers', () => {
  beforeEach((done) => {
    jest.mock('../utils');
    jest.mock('../../db/controllers/UserController');
    done();
  });
  afterEach((done) => {
    jest.unmock('../utils');
    jest.unmock('../../db/controllers/UserController');
    done();
  });
  it('gitUserRepos() should return user repos', () => {
    utils.gitUserRepos('cdcjj')
    .then((response) => {
      expect(response.data).toBeDefined();
      expect(response.data[0].name).toEqual('beesbeesbees');
      expect(response.data[0].owner.login).toEqual('cdcjj');
    });
  });

  it('traversePages() should concat repos from remaining pages', () => {
    utils.gitUserRepos('JeffRiesberg1')
    .then((response) => {
      utils.traversePages(2, 0, response, 'JeffRisberg2')
      .then((resp) => {
        expect(resp[0].name).toEqual('ANG07');
        expect(resp.length).toBe(62);
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
  it('grabUserInfo() should send back object with empty access_token', () => {
    utils.grabUserInfo('techmexdev')
      .then((userProfile) => {
        expect(userProfile.username).toEqual('techmexdev');
        expect(userProfile.access_token).toEqual('');
      });
  });
});
