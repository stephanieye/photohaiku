const mongoose = require('mongoose');
const moment = require('moment');

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
  haiku: { type: String, required: 'This field is required!' },
  poet: { type: mongoose.Schema.ObjectId, ref: 'User' },
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



poemSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Poem', poemSchema);
