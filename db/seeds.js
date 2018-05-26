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
        {image: 'https://lh3.googleusercontent.com/PxwGzfzFJ9OeOJgqeYwOH98NisaabzTRWL8Zq0kLGOetcmUouzgI_rUk-4UuqQnjBJHLjKW7aq7vIyiu5yS3jkvQAqe7tuhsFCAZXddA-uoJCm-XozgPUTF8hkvd2QREnhqQfz2RYvtzjASNzHiEwNLvIqydHtVTlat9-Y8-1DgHTn1lz_q6ksbwEf9zyPVXQgsip-arIcMj617KAZcv_P_kYI-d5x53luk8yqGJ3IAETfTK5ssjyMqlAzbsd6CvKvf5gdobv9jjFb1yBrria84rLmMSD-T3BdTnUnzPTknlEF6StCCYuhZjcsONL2gtdtsJHg3oJo69wZEeRUCiEFFcBuRsLxZfXHXaXJI3x5W8tPVTQQbmDWX-LCOVXya0n5eJhWYIk2JoOmqkkxSgE0IYuOvF8Q1jyReWLxSBfuLv58Mfzv7Ft8r7_jqpc92HiJlQuJhjJ3p1Vv35dZS5cJ6fW_cjApUFiAQ1pDKhpIG86xZynjwpbVC_YKWSPSvHOBzsSOIskCceUMK0ilQqEGn4nuy7-PKJ4qUvFnceyK2Lm5-v8HcZ1uXfol9KGodXUmrVqK7t9EWzzkJDKKEex-6JN6WunPNw5nDoQUs=w1040-h780-no',
          poet: users[0],
          haiku: [{line1: 'let us not speak of', line2: 'the lovely hardwood; instead', line3: 'mind your art dealer.', attr: ''}]
        },
        {image: 'https://lh3.googleusercontent.com/0fgp9BbqvPrQuz-Dr2N9BxsuDAEe_uY93-dqhUntcqE0HOUOIpO1hf9p0_0jExIrWTudk1l2xwnItfl_P5CXIX7g7Y7khBjFe19QbSzEghsUxUotQCSW_GFvwf5YAnYPJl6pfiS3vwkkeoXCJ7Opej9qUPkleHckZgDjgkipiFxOhdrRO-Z5BoqSwwAKeTQEEIpYMx9-Ot4x23HC0SpLYQusVSDasShPokiAvyTVHhaLvI2DRrzZ_dGeKg6NSggSt1hXlHYz3wYNcPmFr7fwfLOj-oqqArZbCYKwf6HdsJ-SnDqColE0CnKJBdHZiNVpiaCRFlak0zdJkglcm2Gar4yT1cVSrN-LcsbjLC9wirPzIU2XqpRCYc207FO3ae0feJcnd-E12hTYfk0mw90MShZ_ZaaGzmRQFdH16rYaVtRpIHXTNc0wGCH7_LYv2llMrqwuFPnQc2m36EA2HcxMTbtQgpCHtDgbLe4_XA1c56gMWauJqSe-V4_h0MdpK4CISraQ2nYiGyCa5h-BLJakU-pFUk_AU6H6Rd_hmH--hqz_c634ZBezvjoxTjSYi7_kRHNMk3oXlffOnc5aGxsr8_jmgKNyg7AldnaIscM=w1040-h780-no',
          poet: users[0],
          haiku: [{line1: 'do not weep, ocean -', line2: 'horizons and waves themselves', line3: 'eventually part.', attr: 'Kobayashi Issa'}]
        },
        {image: 'https://lh3.googleusercontent.com/IUGzaC5BWHXrwLKXJh8kQoB87XndJIXjTBTKi2-aONq8gtyw2XClFoWvkjaEiu7GRLGdR2bSvp8S7pNSGY1FMOVq37JVuoLrqQATJCutYNaPEaHvltVuJbKxwIQBX--Vl3y7CgBJ5qVQVa60EHOygoDUq9KYY6BkzVpTTA9Ps2rTYWZNH9m8wMegjWly8ldGItzIQaWRJaMnwXfbbOAS_FJGWO9OtwB4dlVbOLn3rgf2G5PTZnfdFlO6SLnU3zyOPOpYayXhl_uZSdSzyf8d9v6L2CkBZclXbCNVZIxtorUG8KPxliI0fKedxqrNM9SewYZMLS9Td3Y05E1vH36s2lg91KQub7tyRULzGeNTFoK4We9lMtmIWcSmLUfO2UeOnX5u0rN8oNZk6Bxen9Eeha4nlfqsD6IBrm-9xFLqGsgHLtY7bgERE7cuFMb1UykcYhcvHGOdNr-iJBk1rcpyITtu8_Kg_hlwnPA_9qW4oStGDCmfPrXvIyAD9t-oKrz1H-QPJ9kgpAWpqk7tywYAMvV_WtEQTAG3bv3mO7NxZfnxDZhphdo4BehLj212Xagjayqig_tngrS0JZPFxYDuG6ybaaNlRV8dSAPwvg=w1460-h822-no',
          poet: users[0],
          haiku: [{line1: 'behold: the window', line2: 'dreaming that it is the cat:', line3: "isn't that female?", attr: ''}]
        }])
      .then(poems => {
        console.log(`${poems.length} poems created!`);
      });
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
