const Tag = require('../models/tag');

function indexRoute(req, res, next){
  Tag
    .find()
    .then(tags =>
      res.json(tags))
    .catch(next);
}

function showRoute(req, res, next){
  Tag
    .find(req.params)
    .then(tag => {
      if(!tag) return res.sendStatus(404);
      res.json(tag);
    })
    .catch(next);
}

function createRoute(req, res, next){
  Tag
    .create(req.body)
    .then(tag => res.status(201).json(tag))
    .catch(next);
}
//
// function updateRoute(req, res, next){
//   Poem
//     .findById(req.params.id)
//     .then(poem => {
//       if(!poem) return res.sendStatus(404);
//       return Object.assign(poem, req.body);
//     })
//     .then(poem => poem.save())
//     .then(poem => res.status(201).json(poem))
//     .catch(next);
// }
//
// function deleteRoute(req, res, next){
//   Poem
//     .findById(req.params.id)
//     .then(poem => {
//       if(!poem) return res.sendStatus(404);
//       return poem.remove();
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next);
// }
//
// function poemHaikuCreate(req, res, next) {
//   Poem.findById(req.params.id)
//     .populate('poet haiku')
//     .exec()
//     .then(poem => {
//       poem.haiku.push(req.body);
//       return poem.save();
//     })
//     .then(poem => res.json(poem))
//     .catch(next);
// }


module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute
  // update: updateRoute,
  // delete: deleteRoute,
  // haikuCreate: poemHaikuCreate
};
