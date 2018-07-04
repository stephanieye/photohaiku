const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);


const User = require('../models/user');
const Poem = require('../models/poem');
const Tag = require('../models/tag');


User.collection.drop();
Poem.collection.drop();
Tag.collection.drop();


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
        {image: 'http://stephslye.github.io/images/photohaiku/gallery.jpg',
          poet: users[0],
          haiku: [{line1: 'let us not speak of', line2: 'the lovely hardwood; instead', line3: 'mind your art dealer.', attr: ''}]
        }
        ,
        {image: 'http://stephslye.github.io/images/photohaiku/kayak.jpg',
          poet: users[0],
          haiku: [{line1: 'do not weep, ocean -', line2: 'horizons and waves themselves', line3: 'eventually part.', attr: '(with apologies to kobayashi issa)'}]
        }
        ,
        {image: 'http://stephslye.github.io/images/photohaiku/cats.jpg',
          poet: users[0],
          haiku: [{line1: 'you love dog breed group...', line2: 'but not as much as i love', line3: 'siamese kitten!', attr: ''}]
        }
        ,
        {image: 'http://stephslye.github.io/images/photohaiku/fes.jpg',
          poet: users[1],
          haiku: [{line1: 'look at this city:', line2: 'so major and beautiful.', line3: "that's what i call place!", attr: ''}]
        }
        ,
        {image: 'http://stephslye.github.io/images/photohaiku/lisbon.jpg',
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
