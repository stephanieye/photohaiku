const { env } = require('../config/environment');

function errorHandler(err, req, res, next) {

  const errors = {};
  for(const key in err.errors) {
    errors[key] = err.errors[key].message;
  }
  err.errors = errors;

  if(err.name === 'TokenExpiredError') {
    return res.status(401).json({message: 'Token Expired'});
  }

  if(err.name === 'ValidationError') {
    return res.status(422).json({ message: 'Unprocessable Entity', errors });
  }

  res.status(500).json({ message: 'Internal Server Error' });
  if(env !== 'test') next(err);

}

module.exports = errorHandler;
