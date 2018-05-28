const User = require('../models/user');
const Poem = require('../models/poem');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: `thank you for registering, ${user.username}!`,
        token,
        user
      });

    })
    .catch(next);
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'sorry, either your email address or password is incorrect.' });
      }

      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: `welcome back, ${user.username}!`,
        token,
        user
      });
    })
    .catch(next);
}

function indexRoute(req, res, next){
  User
    .find()
    .exec()
    .then(user =>
      res.json(user))
    .catch(next);
}


function showRoute(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.sendStatus(404);
      res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.sendStatus(404);
      return Object.assign(user, req.body);
    })
    .then(user => user.save())
    .then(user => res.status(201).json(user))
    .catch(next);
}

function deleteRoute(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      Poem
        .find({poet: user})
        .then((poems) => {
          poems.forEach((poem)=> {
            return poem.remove();
          });
        });
      if(!user) return res.sendStatus(404);
      return user.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}



module.exports = {
  register,
  login,
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
