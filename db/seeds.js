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
    username: 'matsuo basho',
    email: 'basho@email.com',
    password: 'a',
    passwordConfirmation: 'a'
  }])
  .then(users => {
    console.log(`${users.length} users created`);

    return Poem
      .create([
        {image: 'http://stephslye.github.io/images/gallery.JPG',
          poet: users[0],
          haiku: [{line1: 'let us not speak of', line2: 'the lovely hardwood; instead', line3: 'mind your art dealer.', attr: ''}]
        }
        ,
        {image: 'http://stephslye.github.io/images/causeway.JPG',
          poet: users[0],
          haiku: [{line1: 'do not weep, ocean -', line2: 'horizons and waves themselves', line3: 'eventually part.', attr: '(apologies to kobayashi issa)'}]
        }
        ,
        {image: 'http://stephslye.github.io/images/cat.JPG',
          poet: users[0],
          haiku: [{line1: 'behold: the window', line2: 'dreaming that it is the cat:', line3: "isn't that female?", attr: ''}]
        }
      ])
      .then(poems => {
        console.log(`${poems.length} poems created!`);
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
