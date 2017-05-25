const LOGIN_USER = 'LOGIN_USER';

const loginUser = user => ({
  type: LOGIN_USER,
  isAuthenticated: true,
  status: 'Available',
});

module.exports = {
  LOGIN_USER,
  loginUser,
};
