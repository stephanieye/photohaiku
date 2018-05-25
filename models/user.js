const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  nouns: [{ type: String }],
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

poemSchema.pre('save', function(next){
  client
    .labelDetection(this.image)
    .then(results => {
      const labels = results[0].labelAnnotations;
      console.log(labels[0].description);
      this.nouns = labels.map(label => label.description);
      next();
    });
});

poemSchema.set('toJSON', {
  virtuals: true
});


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  poems: [poemSchema]
});

userSchema.plugin(require('mongoose-unique-validator'));

userSchema.set('toJSON', {
  transform(doc, json) {
    delete json.password;
    return json;
  }
});

userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
