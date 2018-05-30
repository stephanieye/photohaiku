const router = require('express').Router();
const users = require('../controllers/auth');
const poems = require('../controllers/poem');
const tags = require('../controllers/tag');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.post('/register' , auth.register);
router.post('/login' , auth.login);

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

router.route('/poems')
  .get(poems.index)
  .post(secureRoute, poems.create);

router.route('/poems/:id')
  .get(poems.show)
  .put(poems.update)
  .delete(secureRoute, poems.delete);

router.post('/poems/:id/haiku', secureRoute, poems.haikuCreate);


router.route('/tags')
  .get(tags.index)
  .post(tags.create);

router.route('/tags/:noun')
  .get(tags.show);
  // .put(poems.update)
  // .delete(secureRoute, poems.delete);


module.exports = router;
