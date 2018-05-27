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
        {image: 'https://lh3.googleusercontent.com/evo3B63AZ1hVsC7W0jWpORXiiSo7rZ7ASYPHD_Brv-KXNwJo5X0m2Toy_9MtW1P17F2YxP7VpPJA0Uk24UP0aToym5zFGYSGJiH4c4avsiQ7gqX_7UKXt3ZceoU-ChYS_TawNUUHU-dFZmSklWcliHxKpish6gD5iJvDerbIGprAdETd08fbJ6VHRMyPpj_sTim-tWKOQhXI1W9mCHffUe_g9Ffg9O8RqkMCQsxGlQVJKcn17Wo0ChgloJ1yfRfvSKvglm1QOXU3JVSzjGQMo7X7NIJg6pwT1G2capRj7WuveToMRH85fC7JsqzFGPKFaTObKmRBUgcTmyvmy8AEpwjdNJ5oOR2pTN_UKUt1QzKW013fyYLMkUPzCd7avA-rdMsuEVyH51ezwc9CVouHB_GY7PxHQg3yjXMuKgOtKiLOAz_gGhy3K2OYLNHay9ohUjfk5r0t7L2iD4hwTW7R57Z5M4IGCPzuoPFNZvg2kIZSUFoP5R8ANfeeR2Qr5-OBipMQIE4ysz7TiwYCoZMXNRzLKF8pX3gI7Aiy6Jb5aYiyimLD9BaY1QJNjBrEdGq7apMEgq6epEaeJ2X2anDG2qlmEeDS8jF-0yci5ac=w906-h680-no',
          poet: users[0],
          haiku: [{line1: 'let us not speak of', line2: 'the lovely hardwood; instead', line3: 'mind your art dealer.', attr: ''}]
        }
        ,
        {image: 'https://lh3.googleusercontent.com/wgyatE7LkcOm42zsHuXhKc-hH-qZAVX59s_0QfD9gdMNME7OTrhDyTC6N3Qk_nEF1QgXTz2pvX0BhKklOZZ2zT0hyUPKUyUqZKwze1VLjkx2V8oQOq-0J4s7DYgLnFLXNA1FyJyReDK2o6GbxnXC9iKCfPyjYOxbwW9Ohp36OK0GBjYiiIkyK3YbBUzLHvTPVfB2L7so79Q6o2I4J5wJSZXVwcX4CQv-EJwEvrMQFZuPi3Kul1bu2Uq3x3BEIGB6zjHhRBarYavvGtpB9rynOMfu-KARCitUPrdeoxmMcE45O4q80nipvjqCAiAXzljb0d-qERCMNmw7o827VeMLmSFh3GdpoOOBa4qnQwcAkCJAXBmqwaLAvOXqDL7fS4OsnagFLegi85T_4Wkbs_JrIONlnS1qK2TeMEi6Kl7JZmsZGcyi5Mj2Ucqny0WMLR2J3h3C8DRA9MXiWhTM8ArL285dqTVttrnk_2c8ehGgF6NqjgXv7FwbuM4qUspze3_DRaHpYt3wiQ7gDZI3NI0C91E-Wd943I2hHVUGFEAjZuhygVU-Nqa4-I6HGbzNjD8H6x-KQuX20VgrHui_kM9gEBcbJHZPsSjloddfcZM=w906-h680-no',
          poet: users[0],
          haiku: [{line1: 'do not weep, ocean -', line2: 'horizons and waves themselves', line3: 'eventually part.', attr: '(apologies to kobayashi issa)'}]
        }
        ,
        {image: 'https://lh3.googleusercontent.com/sONoUveY0H_1k-Qks5E6ylQh1Y-_WtGZUR28cAlTs76sqea6tUvs4iqax4wcViaOPEBMjTTXirTv3Gu9-AOcYEmb76DeXyQDYhIrrHK_3USzMPRv2tAgHtDCBPEPLDhh_MV6EiMxLrQW2UahWNJlSX2IIjCUfbVxB80nq3ZZe7OwfjrLkR67dXnaC3tTk6XxF00vPHAFcaLOkYpd8ZxV1G0GNPhmA9kk3Whb5AAG_hnc65Y1A3s0lNGPuyvlpQgyG1303J82V-ZSw21I24eAtmYogoh8MkFGq_Bpcv7mcMb8f1EG9xNPRKUMcG5L4xEsJPAq6MaqmOLF__Ll4q65PSxGUTE4eRpoy3wZOY_n0UmAKx8kgdwLR_OYQ1n1cGycYc5D2ZjT56umvs8Crw-2_Q4J44dgnKpWMK-TqEfkt4AaTkoX7q2TuRhU79p5o7pD_GXDQljO6UirQ_vIIBYRW9gHcUGCXPVULd-6tTaBdMUVZ28LHuqnzmgGjEu5kjpkVBoay5OwxEwNaeBYBJY2X67G9HJCJDELtFvMbH_kAMZpBtmwo7UNGJGlE3zw3_0kKf5x5dygNVgrnnbrCzcT50dcwiORKfdWJvT_9w=w906-h510-no',
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
