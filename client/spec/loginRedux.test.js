/* global describe it expect */
// import configureMockStore from 'redux-mock-store';
// import nock from 'nock';
// import thunk from 'redux-thunk';
// import jwt from 'jsonwebtoken';
import actions from '../redux/actions/loginActions';
// import reducers from '../redux/reducers/loginReducer';


// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

describe('Login action creators', () => {
  it('should create an action to login user', () => {
    const expectedLogin = {
      type: actions.LOGIN_USER,
      isAuthenticated: 'tomcat123',
      status: 'Available',
    };
    expect(actions.loginUser('tomcat123', 'Available')).toEqual(expectedLogin);
  });
  it('should create an action to logout user', () => {
    const expectedLogout = {
      type: actions.LOGOUT_USER,
      isAuthenticated: '',
      status: 'Unavailable',
    };
    expect(actions.logoutUser('', 'Unavailable')).toEqual(expectedLogout);
  });
  it('should create an action to change login status to loading', () => {
    const expectedStatus = {
      type: actions.LOAD_LOGIN,
    };
    expect(actions.loadLogin()).toEqual(expectedStatus);
  });
});

// describe('login reducer', () => {
//   it('should return the initial state', () => {
//     expect(
//       reducers(undefined, {})
//     ).toEqual(
//       {
//         status: '',
//         isAuthenticated: '',
//         rehydrated: false,
//         reminder: false,
//       }
//     );
//   });
//
//   it('should handle LOGIN_USER', () => {
//     expect(
//       reducers({}, {
//         type: actions.LOGIN_USER,
//         isAuthenticated: 'tomcat123',
//         status: 'READY'
//       })
//     ).toEqual(
//       {
//         isAuthenticated: 'tomcat123',
//         status: 'READY'
//       }
//     );
//   });
//
//   it('should handle LOAD_LOGIN', () => {
//     expect(
//       reducers({}, {
//         type: actions.LOAD_LOGIN,
//         status: 'LOADING'
//       })
//     ).toEqual(
//       {
//         status: 'LOADING'
//       }
//     );
//   });
//
//   it('should handle LOGIN_REMINDER', () => {
//     expect(
//       reducers({}, {
//         type: actions.LOGIN_REMINDER,
//         reminder: true
//       })
//     ).toEqual(
//       {
//         reminder: true
//       }
//     );
//   });
// });

// describe('async actions', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });
//
//   it('creates LOGIN_USER when loginUserAsync is done', (code) => {
//     nock('http://localhost:3034')
//       .post('/api/users/login', { code })
//       .reply(201,
          //   data: 'eyJhbGciOiJIUzI1NiJ9.YWFsY290dDE0.cm3TbnKFAI8-HF98v73rDXrxZbYuKuu7kw5gYQIKq2U'
          // });
//
//     const expectedActions = [
//       { type: actions.LOAD_LOGIN },
//       { type: actions.LOGIN_USER, body: { isAuthenticated: 'aalcott14', status: 'READY' } }
//     ];
//     const store = mockStore({ isAuthenticated: '', status: '' });
//
//     return store.dispatch(actions.loginUserAsync('245ae3e29c6e0dd7ebad'))
//       .then((resp) => {
//         const user = jwt.decode(resp.data);
//         store.dispatch(actions.loginUser(user, 'READY'));
//         expect(store.getActions()).toEqual(expectedActions);
//       });
//   });
// });
