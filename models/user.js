const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: { type: String, required: 'please provide a username', unique: 'this username is already registered with photohaiku', lowercase: true },
  email: { type: String, required: 'please provide an email address', unique: 'this email address is already registered with photohaiku', lowercase: true },
  password: { type: String, required: 'please provide a password' }
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
    this.invalidate('passwordConfirmation', 'your password and password confirmation do not match');
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
