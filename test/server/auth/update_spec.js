/* global api, describe, it, expect, beforeEach */


const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

const { secret } = require('../../../config/environment');

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

let token;
let userId;



describe('PUT /users/:id/', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id;
        token = jwt.sign({ sub: userId }, secret, {expiresIn: '6h'});
      })
      .then(() => done());
  });


  it('should return a 401 response without token', done => {
    api
      .put(`/api/users/${userId}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response with token', done => {
    api
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

});
