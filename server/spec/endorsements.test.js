/* eslint-env jest */
// import axios from 'axios';
// import mongoose from 'mongoose';
// import User from '../../db/models/User';

describe('endorsement creation', () => {
  test('placement', () => {
    expect(1 + 1).toEqual(2);
  });
  // const url = 'http://localhost:3034/api/endorsement/';
  // const endorsement = {
  //   endorsee: 'Fliko',
  //   endorserToken:
  // 'eyJhbGciOiJIUzI1NiJ9.dGVjaG1leGRldg.9-fvxZx-pXGspIscUx2ZYW3tD7BZiVS0rygiq8LQ_Lo',
  //   title: 'A title',
  //   comments: 'This is a comment',
  //   skills: ['a skill', 'another', 'again']
  // };
  // let db;
  //
  // beforeAll(async () => {
  //   mongoose.Promise = Promise;
  //   await mongoose.connect('mongodb://localhost:27017/codeupdb');
  //   db = mongoose.connection;
  // });

  // afterAll(() => {
  //   User.findOneAndUpdate({ username: 'Fliko' }, { endorsements: [] });
  //   db.close();
  // });
  //
  // beforeEach(async () => {
  //   await User.findOneAndUpdate({ username: 'Fliko' }, { endorsements: [] });
  // });
  //
  //
  // test('server responds with 400 on bad requests', async () => {
  //   expect.assertions(1);
  //
  //   await expect(axios.post(url))
  //   .rejects.toEqual(Error('Request failed with status code 400'));
  // });
  //
  // test('server responds with endorsement upon creation', async () => {
  //   expect.assertions(2);
  //
  //   await axios.post(url, endorsement)
  //   .then((res) => {
  //     expect(res.status).toBe(200);
  //     const resEnd = Object.assign({}, endorsement,
  //       { endorserUsername: 'techmexdev' }, { endorserImg: 'https://avatars0.githubusercontent.com/u/10700721?v=3' });
  //     delete resEnd.endorser;
  //     delete resEnd.endorserToken;
  //     expect(res.data['Sent endorsement']).toEqual(resEnd);
  //   });
  // });
  //
  // test('cannot post an endorsement with same endorser, comments, & skills', async () => {
  //   expect.assertions(1);
  //
  //   await axios.post(url, endorsement);
  //   await axios.post(url, endorsement);
  //   await User.findOne({ username: 'Fliko' })
  //   .then((doc) => {
  //     expect(doc.toObject().endorsements.length).toEqual(1);
  //   });
  // });
  //
  // test('only endorsers can delete endorsements', async () => {
  //   // FIX
  //   await axios.post(url, endorsement);
  //   await expect(User.findOne({ username: 'Fliko' }, 'endorsements'));
  //
  //   await axios.delete(url, endorsement);
  //   User.findOne({ username: 'Fliko' }, 'endorsements')
  //   .then(doc => doc.toObject().endorsements)
  //   .then((ends) => {
  //     expect(ends).toBe([]);
  //   });
  // });
  //
  // test('blank endorsements are not stored', async () => {
  //   expect.assertions(2);
  //   const endoNoTitle = Object.assign({}, endorsement, { title: '' });
  //   const endoNoComments = Object.assign({}, endorsement, { comments: '' });
  //
  //   await expect(axios.post(url, endoNoTitle)
  //   .rejects.toEqual(Error('Request failed with status code 400')));
  //
  //   await expect(axios.post(url, endoNoComments)
  //   .rejects.toEqual(Error('Request failed with status code 400')));
  // });
  //
  // test('user cannot endorse him/herself', async () => {
  //   expect.assertions(1);
  //   const flikoToken =
  // 'eyJhbGciOiJIUzI1NiJ9.Rmxpa28.pDCHKc-g6CAt5MzSmucQpH7GYBeWrcvjDxKSgk2Qj8w';
  //   const flikoEndorsement = Object.assign({}, endorsement, { endorserToken: flikoToken });
  //
  //   await expect(axios.post(url, flikoEndorsement))
  //   .rejects.toEqual(Error('Request failed with status code 403'));
  // });
  //
  // test('endorsers must be authenticated', async () => {
  //   const endoWithEndorser = Object.assign({}, endorsement, { endorserUsername: 'techmexdev' });
  //   delete endoWithEndorser.endorserToken;
  //
  //   await expect(axios.post(url, endorsement))
  //   .rejects.toEqual(Error('Request failed with status code 400'));
  // });
});
