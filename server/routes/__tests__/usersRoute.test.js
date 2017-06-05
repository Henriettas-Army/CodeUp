/* eslint-env jest */
// const request = require('supertest');
const router = require('../users');

describe('Users Route', () => {
  test('should respond the GET method with user object', () => {
    router.get('/techmexdev')
      .then((resp) => {
        expect(resp.statusCode).toBe(200);
      });
  });
});
