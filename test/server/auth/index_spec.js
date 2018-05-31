/* global api, describe, it, expect, beforeEach  */

const User = require('../../../models/user');

const userData = [{
  username: 'jane austen',
  email: 'jane@test.com',
  password: 'password1',
  passwordConfirmation: 'password1'
}, {
  username: 'charles dickens',
  email: 'charlie@test1.com',
  password: 'password2',
  passwordConfirmation: 'password2'
}
];

describe('GET /users', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array as response body', done => {
    api
      .get('/api/users')
      .end((err, res) => {
        expect(res.body).to.be.a('array');
        done();
      });
  });

  it('should return an array of valid user objects', done => {
    api
      .get('/api/users')
      .end((err, res) => {
        res.body
          .sort((a,b) => a.username < b.username)
          .forEach((user, index, username) => {
            expect(user[username]).to.deep.eq(userData[index][username]);
          });
        done();
      });
  });

});
