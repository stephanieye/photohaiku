const express = require('express');
const app = express();
const router = require('./config/router');
const { port, dbURI } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

// const vision = require('@google-cloud/vision');
//
// // Creates a client
// const client = new vision.ImageAnnotatorClient(
//   {keyFilename: '../photohaiku-95c6f32c0f45.json'}
// );
//
// // Performs label detection on the image file
// client
//   .labelDetection('./db/london.jpg')
//   .then(results => {
//     const labels = results[0].labelAnnotations;
//
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });



app.use(bodyParser.json());
app.use('/api', router);

app.use(errorHandler);

app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`We are up and running on port ${port}`));

module.exports = app;
