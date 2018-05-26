const mongoose = require('mongoose');
const moment = require('moment');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient(
  {keyFilename: '../photohaiku-95c6f32c0f45.json'}
);


const haikuSchema = new mongoose.Schema({
  line1: { type: String },
  line2: { type: String },
  line3: { type: String }
});


const poemSchema = new mongoose.Schema({
  image: { type: String, required: 'This field is required!' },
  nouns: [{ type: String }],
  poet: { type: mongoose.Schema.ObjectId, ref: 'User' },
  haiku: [haikuSchema]
}, {
  timestamps: true
});

poemSchema.virtual('createdAtRelative')
  .get(function(){
    return moment(this.createdAt).fromNow();
  });

poemSchema.pre('save', function(next){
  client
    .labelDetection(this.image)
    .then(results => {
      const labels = results[0].labelAnnotations;
      console.log(labels[0].description);
      this.nouns = labels.map(label => label.description);
      next();
    })
    .catch(next);
});

poemSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Poem', poemSchema);
