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
  }, {
    username: 'natsume soseki',
    email: 'soseki@email.com',
    password: 'a',
    passwordConfirmation: 'a'
  }])
  .then(users => {
    console.log(`${users.length} users created`);

    return Poem
      .create([
        {image: 'http://stephslye.github.io/images/gallery.jpg',
          poet: users[0],
          haiku: [{line1: 'let us not speak of', line2: 'the lovely hardwood; instead', line3: 'mind your art dealer.', attr: ''}]
        }
        ,
        {image: 'http://stephslye.github.io/images/causeway.jpg',
          poet: users[0],
          haiku: [{line1: 'do not weep, ocean -', line2: 'horizons and waves themselves', line3: 'eventually part.', attr: '(with apologies to kobayashi issa)'}]
        }
        ,
        {image: 'http://stephslye.github.io/images/cat.jpg',
          poet: users[0],
          haiku: [{line1: 'behold: the window', line2: 'dreaming that it is the cat:', line3: "isn't that female?", attr: ''}]
        }
        ,
        {image: 'http://stephslye.github.io/images/london.jpg',
          poet: users[1],
          haiku: [{line1: 'so much depends on', line2: 'the beautiful skyscraper', line3: 'beside the water', attr: 'with apologies to william carlos williams'}]
        }
        ,
        {image: 'http://stephslye.github.io/images/fes.jpg',
          poet: users[1],
          haiku: [{line1: 'look at this city:', line2: 'so major and beautiful.', line3: "that's what i call place!", attr: ''}]
        }
        ,
        {image: 'http://stephslye.github.io/images/lisbon.jpg',
          poet: users[1],
          haiku: [{line1: 'to column or not', line2: 'to column: only the sky', line3: 'would ask that question.', attr: 'with apologies to william shakespeare'}]
        }
      ])
      .then(poems => {
        console.log(`${poems.length} poems created!`);
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
