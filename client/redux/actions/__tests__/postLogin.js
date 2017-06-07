import jwt from 'jsonwebtoken';

jest.mock('../loginActions');
const loginActions = require('../loginActions');

const accessToken = {
  abc: 'abc123'
};

const user = {
  abc123: 'tomcat123'
};

loginActions.postLogin.mockImplementation(code => (
  new Promise((resolve) => {
    const access = accessToken[code];
    const username = user[access];
    const token = jwt.sign(username, 'codeupforever');
    resolve(token);
  })
));


it('postLogin should return code from GitHub', () => {
  // expect(loginActions.postLogin).toBeDefined();
  expect.assertions(1);
  loginActions.postLogin('abc')
    .then(token => expect(jwt.decode(token, 'codeupforever')).toEqual('tomcat123'));
});
