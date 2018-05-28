const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/haiku-${env}`;
const secret = process.env.SECRET || 'Consider me / As one who loved poetry / And persimmons.';

require('dotenv').config();

module.exports = { port, dbURI, secret, env };
