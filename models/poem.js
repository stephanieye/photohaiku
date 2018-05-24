const mongoose = require('mongoose');
const moment = require('moment');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient(
  {keyFilename: '../photohaiku-95c6f32c0f45.json'}
);


const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  rating: {type: Number, required: true, min: 1, max: 5 },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

commentSchema.virtual('createdAtRelative')
  .get(function(){
    return moment(this.createdAt).fromNow();
  });


commentSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.createdAt;
    delete json.updatedAt;
    return json;
  }
});

const poemSchema = new mongoose.Schema({
  image: { type: String, required: 'This field is required!' },
  haiku: { type: String },
  poet: { type: mongoose.Schema.ObjectId, ref: 'User' },
  nouns: [{ type: String }],
  comments: [commentSchema]
}, {
  timestamps: true
});

poemSchema.virtual('createdAtRelative')
  .get(function(){
    return moment(this.createdAt).fromNow();
  });

poemSchema.virtual('avgRating')
  .get(function(){
    return this.comments.reduce((sum, comment) => sum + comment.rating, 0) / this.comments.length;
  });

poemSchema.pre('save', function(next){
  client
    .labelDetection(this.image)
    .then(results => {
      const labels = results[0].labelAnnotations;
      this.nouns = labels.map(label => label.description);
      next();
    });
});





poemSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Poem', poemSchema);
