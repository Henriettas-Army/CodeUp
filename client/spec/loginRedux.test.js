/* global describe it expect */
import actions from '../redux/actions/loginActions';

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
