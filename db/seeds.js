const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Poem = require('../models/poem');

User.collection.drop();
Poem.collection.drop();

User
  .create([{
    username: 'Jane Austen',
    email: 'jane@austen.com',
    password: 'a',
    passwordConfirmation: 'a'
  },{
    username: 'Emily Bronte',
    email: 'emily@bronte.com',
    password: 'a',
    passwordConfirmation: 'a'
  },{
    username: 'Cat',
    email: 'cat@cat.com',
    password: 'a',
    passwordConfirmation: 'a'
  },{
    username: 'Dog',
    email: 'dog@dog.com',
    password: 'a',
    passwordConfirmation: 'a'
  }])
  .then(users => {
    console.log(`${users.length} users created`);

    return Poem
      .create([{
        image: 'https://blogmedia.evbstatic.com/wp-content/uploads/bloguk/shutterstock_199419065-730x487.jpg',
        haiku: 'this is a haikuuuuuuuuu',
        poet: users[0]
      },{
        image: 'https://i.ytimg.com/vi/dTp72sci8CA/maxresdefault.jpg',
        haiku: 'this is a haikuuuuuuuuu1',
        poet: users[1]
      },{
        image: 'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
        haiku: 'this is a haikuuuuuuuuu2',
        poet: users[2]
      },{
        image: 'https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg',
        haiku: 'this is a haikuuuuuuuuu3',
        poet: users[3]
      },{
        image: 'http://www.afr.com/content/dam/images/g/w/z/1/s/c/image.related.afrArticleLead.620x350.gx8oag.png/1499767087682.jpg',
        haiku: 'this is a haikuuuuuuuuu4',
        poet: users[0]
      }]);
  })
  .then(poems => console.log(`${poems.length} poems created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
