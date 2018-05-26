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
    username: 'Matsuo Bashō',
    email: 'basho@email.com',
    password: 'a',
    passwordConfirmation: 'a'
  }])
  .then(users => {
    console.log(`${users.length} users created`);

    return Poem
      .create([
        {image: 'https://i.ytimg.com/vi/GM7SOweWAHE/maxresdefault.jpg',
          poet: users[0],
          haiku: [{line1: 'line1', line2: 'line2', line3: 'line3'}]
        },
        {image: 'https://www.telegraph.co.uk/content/dam/video_previews/x/5/x5cgi0ode66q6vuxezqmehmexwer6bt-xlarge.jpg',
          poet: users[0],
          haiku: [{line1: 'line1', line2: 'line2', line3: 'line3'}]
        },
        {image: 'http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_720/images/live/p0/60/xb/p060xbfc.jpg',
          poet: users[0],
          haiku: [{line1: 'line1', line2: 'line2', line3: 'line3'}]
        }])
      .then(poems => {
        console.log(`${poems.length} poems created!`);
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
