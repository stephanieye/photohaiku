const Poem = require('../models/poem');

function indexRoute(req, res, next){
  Poem
    .find()
    .populate('poet comments.createdBy')
    .exec()
    .then(poems =>
      res.json(poems))
    .catch(next);
}


function showRoute(req, res, next){
  Poem
    .findById(req.params.id)
    .populate('poet comments.createdBy')
    .exec()
    .then(poem => {
      if(!poem) return res.sendStatus(404);
      res.json(poem);
    })
    .catch(next);
}

function createRoute(req, res, next){
  req.body.poet = req.currentUser;
  Poem
    .create(req.body)
    .then(poem => res.status(201).json(poem))
    .catch(next);
}

function updateRoute(req, res, next){
  Poem
    .findById(req.params.id)
    .populate('poet comments.createdBy')
    .exec()
    .then(poem => {
      if(!poem) return res.sendStatus(404);
      return Object.assign(poem, req.body);
    })
    .then(poem => poem.save())
    .then(poem => res.status(201).json(poem))
    .catch(next);
}

function deleteRoute(req, res, next){
  Poem
    .findById(req.params.id)
    .populate('poet comments.createdBy')
    .exec()
    .then(poem => {
      if(!poem) return res.sendStatus(404);
      return poem.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

function commentCreateRoute(req, res, next) {
  req.body.createdBy = req.currentUser;
  Poem.findById(req.params.id)
    .populate('poet comments.createdBy')
    .exec()
    .then(poem => {
      poem.comments.push(req.body);
      return poem.save();
    })
    .then(poem => res.json(poem))
    .catch(next);
}


function commentDeleteRoute(req, res, next) {

  Poem.findById(req.params.id)
    .populate('poet comments.createdBy')
    .exec()
    .then(poem => {
      const comment = poem.comments.id(req.params.commentId);
      if(!comment.createdBy.equals(req.currentUser._id)) {
        return res.status(401).json({message: 'Unauthorised'});
      }
      comment.remove();
      return poem.save();
    })
    .then(poem => res.json(poem))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
};
