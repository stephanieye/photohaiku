const router = require('express').Router();
const poems = require('../controllers/poem');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/poems')
  .get(poems.index)
  .post(secureRoute, poems.create);

router.route('/poems/:id')
  .get(poems.show)
  .put(secureRoute, poems.update)
  .delete(secureRoute, poems.delete);

router.post('/poems/:id/comments', secureRoute, poems.commentCreate);
router.delete('/poems/:id/comments/:commentId', secureRoute, poems.commentDelete);

router.post('/register' , auth.register);
router.post('/login' , auth.login);


module.exports = router;
