/* global api, describe, it, expect, beforeEach */
const jwt = require('jsonwebtoken');

const User = require('../../../models/user');
const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

let user;

describe('POST /login', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(_user => {
        user = _user;
        done();
      });
  });

  it('should return a 200 response', done => {
    api
      .post('/api/login')
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a valid token', done => {
    api
      .post('/api/login')
      .send(userData)
      .end((err, res) => {
        const payload = jwt.decode(res.body.token);
        expect(payload.sub).to.exist;
        expect(user._id.equals(payload.sub)).to.be.true;
        done();
      });
  });

  it('should return a 401 response if password is bad', done => {
    api
      .post('/api/login')
      .send({ email: 'test@test.com', password: 'bad' })
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('sorry, either your email address or password is incorrect.');
        done();
      });
  });

  it('should return a 401 response if the email is bad', done => {
    api
      .post('/api/login')
      .send({ email: 'bad@test.com', password: 'test' })
      .end((err, res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('sorry, either your email address or password is incorrect.');
        done();
      });
  });
});
