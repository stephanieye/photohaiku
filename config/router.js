const router = require('express').Router();
const users = require('../controllers/auth');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

// router.route('/users/:id')
//   .get(users.show)
//   .put(users.update)
//   .delete(users.delete);

router.post('/users/:id/poems', secureRoute, users.poemCreate);
router.delete('/users/:id/poems/:poemId', secureRoute, users.poemDelete);

router.post('/users/:id/poems/:poemId/haiku', secureRoute, users.haikuCreate);

// router.post('/users/:id/poems', users.poemCreate);
// router.delete('/users/:id/poems/:poemId', users.poemDelete);
//
// router.post('/users/:id/poems/:poemId/haiku', users.haikuCreate);

router.post('/register' , auth.register);
router.post('/login' , auth.login);


module.exports = router;
