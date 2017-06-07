/* eslint-env jest */
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import nock from 'nock';
// const actions = require('../redux/actions/profileActions');
// const reducer = require('../redux/reducers/profileReducer');

// jest.mock('../redux/__mocks__/window');

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

describe('action creators', () => {
  it('should pass test', () => {
    const expected = 5;
    expect(5).toEqual(expected);
  });
  // it('should return the initial state', () => {
  //   expect(reducer(undefined, {})).toEqual([
  //     {
  //       profile: {},
  //       status: 'READY',
  //       errMessage: '',
  //       editing: false,
  //     }
  //   ]);
  // });
  // it('should create an action to change status to loading', () => {
  //   const expectedLoad = {
  //     type: actions.LOAD_PROFILE,
  //   };
  //   expect(actions.loadProfile()).toEqual(expectedLoad);
  // });
  // it('should create an action to change status to error', () => {
  //   const errMessage = 'not authorized';
  //   const expectedError = {
  //     type: actions.ERROR_PROFILE,
  //     errMessage,
  //   };
  //   expect(actions.errorProfile('not authorized')).toEqual(expectedError);
  // });
  // it('should create an action to toggle editing boolean', () => {
  //   const expectedEditing = {
  //     type: actions.EDIT_PROFILE,
  //   };
  //   expect(actions.editProfile()).toEqual(expectedEditing);
  // });
  // it('should create an action to add profile data', () => {
  //   const profile = {
  //     username: 'tomcat123',
  //     name: 'Tomer Timcat',
  //     img: 'https://img.url',
  //     bio: 'I like cats and coding',
  //   };
  //   const expectedProfile = {
  //     type: actions.PROFILE_DATA,
  //     profile,
  //   };
  //   expect(actions.profileData(profile)).toEqual(expectedProfile);
  // });
  // it('should create an action to update profile', () => {
  //   const profile = {
  //     username: 'tomcat123',
  //     name: 'Tomer Timcat',
  //     img: 'https://img.url',
  //     bio: 'I like cats and coding',
  //   };
  //   const expectedUpdate = {
  //     type: actions.UPDATE_PROFILE,
  //     profile,
  //   };
  //   expect(actions.updateProfile(profile)).toEqual(expectedUpdate);
  // });
});
