const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: `Thank you for registering, ${user.username}!`,
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
        return res.status(401).json({ message: 'Unauthorised' });
      }

      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({
        message: `Welcome back, ${user.username}!`,
        token,
        user
      });
    })
    .catch(next);
}

function indexRoute(req, res, next){
  User
    .find()
    .populate('poems poems.poet')
    .exec()
    .then(user =>
      res.json(user))
    .catch(next);
}


function showRoute(req, res, next){
  User
    .findById(req.params.id)
    .populate('poems poems.poet')
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
    .populate('poems poems.poet')
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
    .populate('poems poems.poet')
    .exec()
    .then(user => {
      if(!user) return res.sendStatus(404);
      return user.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

function poemCreateRoute(req, res, next) {
  req.body.poet = req.currentUser;
  User.findById(req.params.id)
    .populate('poems poems.poet')
    .exec()
    .then(user => {
      user.poems.push(req.body);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}


function poemDeleteRoute(req, res, next) {

  User.findById(req.params.id)
    .populate('poems poem.poet')
    .exec()
    .then(user => {
      const poem = user.poems.id(req.params.poemId);
      if(!poem.poet.equals(req.currentUser._id)) {
        return res.status(401).json({message: 'Unauthorised'});
      }
      poem.remove();
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  register,
  login,
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  poemCreate: poemCreateRoute,
  poemDelete: poemDeleteRoute
};
