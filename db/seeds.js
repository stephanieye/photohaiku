const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');

User.collection.drop();

User
  .create([{
    username: 'Matsuo Bashō',
    email: 'basho@email.com',
    password: 'a',
    passwordConfirmation: 'a',
    poems: [{
      image: 'https://blogmedia.evbstatic.com/wp-content/uploads/bloguk/shutterstock_199419065-730x487.jpg',
      haiku: 'this is a haikuuuuuuuuu'
    },{
      image: 'https://i.ytimg.com/vi/dTp72sci8CA/maxresdefault.jpg',
      haiku: 'this is a haikuuuuuuuuu1'
    },{
      image: 'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
      haiku: 'this is a haikuuuuuuuuu2'
    },{
      image: 'https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg',
      haiku: 'this is a haikuuuuuuuuu3'
    },{
      image: 'http://www.afr.com/content/dam/images/g/w/z/1/s/c/image.related.afrArticleLead.620x350.gx8oag.png/1499767087682.jpg',
      haiku: 'this is a haikuuuuuuuuu4'
    }]
  }])

  .then(users => {
    console.log(`${users.length} users created!`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
