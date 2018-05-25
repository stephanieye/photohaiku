const { env } = require('../config/environment');

function errorHandler(err, req, res, next) {

  if(err.name === 'TokenExpiredError') {
    return res.status(401).json({message: 'Token Expired'});
  }

  if(err.name === 'TypeError') {
    return res.status(418).json({message: 'I am a teapot'});
  }

  if(err.name === 'ValidationError') {
    const errors = {};
    for(const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    err.errors = errors;
    return res.status(422).json({ message: 'Unprocessable Entity', errors });
  }

  res.status(500).json({ message: 'Internal Server Error' });
  if(env !== 'test') next(err);
}

module.exports = errorHandler;
