const chalk = require('chalk');
const { sync } = require('./server/db/db');
const { User, Product, Category } = require('./server/db/models/index');

const categories = [
  {
    name: 'Flugelhorns'
  },
  {
    name: 'Alto Flutes'
  }
];

const flugelhorns = [
  {
    name: 'Yamaha YFH-631G Series Bb Flugelhorn',
    price: 1995,
    description: 'This Yamaha YFH-631G Professional Flugelhorn features traditional vertical valve tubing with Monel pistons that are resistant to corrosion and retain precise fit and smooth action over many years. Hand-lapped pistons and slides ensure an absolutely perfect fit and seal between the pistons and casing or slide parts for smooth air flow and action as well as improved response and intonation.',
    imgSrcLg: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/horns/horn1_large.jpg',
    imgSrcSm: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/horns/horn1_small.jpg',
  },
  {
    name: 'Bach 183 Stradivarius Series Bb Flugelhorn 183S Silver',
    price: 4750,
    description: 'Bach instruments are known throughout the world for their high quality and detail for perfection. This Stradivarius flugelhorn has exceptional focus along with the rich, full sound that Bach is known for.',
    imgSrcLg: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/horns/horn2_large.jpg',
    imgSrcSm: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/horns/horn2_small.jpg',
  },
  {
    name: 'Antoine Courtois Paris AC155-1-0 Professional Bb Flugelhorn Silver Rose Brass Bell',
    price: 3495,
    description: 'The AC155 Professional Series features a .413-inch bore and direct air column design through the valve block. The AC155 also features a 6.6-inch bell plus 1st and 3rd valve slide triggers for easy intonation adjustment.',
    imgSrcLg: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/horns/horn3_large.jpg',
    imgSrcSm: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/horns/horn3_small.jpg',
  }
]
const altoFlutes = [
  {
    name: 'Wm. S Haynes Amadeus AF670 Alto Flute',
    price: 2995,
    description: 'The AF670 Alto Flute features a sterling silver Haynes Classic head joint on a silver-plated body with .016 wall thickness and silver-plated mechanism. It has Y-arm key cups and a C foot with an offset G. It is tuned to Haynes A-442 scale and comes with a French wood case and nylon case cover.',
    imgSrcLg: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/flutes/flute1_large.jpg',
    imgSrcSm: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/flutes/flute1_small.jpg',
  },
  {
    name: 'Brio BAF-2 Series Alto Flute Silver Curved Head',
    price: 6475,
    description: 'The Brio Alto model 2 features a hand-cut solid silver head joint and body with plated pointed tone arm mechanism utilizing thumb and D# rollers and trill keys. Available with straight, curved and combination of both head joints.',
    imgSrcLg: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/flutes/flute2_large.jpg',
    imgSrcSm: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/flutes/flute2_small.jpg',
  },
  {
    name: 'Gemeinhardt Alto Flute Solid Silver Body',
    price: 995,
    description: 'The response of the Gemeinhardt Model 11A alto flute is excellent through all registers, and the Y-arm mechanism is stable and strong. It is an excellent selection for school band programs in that it plays well, sounds good, and is affordable. It is designed to play with ease throughout the entire range of the instrument.',
    imgSrcLg: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/flutes/flute3_large.jpg',
    imgSrcSm: 'https://fullstack-2004-rebel-alliance.s3.us-east-2.amazonaws.com/flutes/flute3_small.jpg',
  },
]

const seed = async () => {
  try {
    const user = {
      username: 'rebelalliance',
      password: 'usetheforce',
      email: 'luke@yoda.com',
      role: 'admin',
    }

    await User.create(user);
    console.log(chalk.green('DB SEEDED'));

    const [horns, flutes] = await Promise.all(categories.map(cat => {
      return Category.create(cat);
    }));

    await Promise.all(flugelhorns.map(horn => {
      horn.categoryId = horns.id;
      return Product.create(horn);
    }));

    await Promise.all(altoFlutes.map(flute => {
      flute.categoryId = flutes.id;
      return Product.create(flute);
    }));

  } catch (e) {
    console.log(chalk.red('ERROR SEEDING DB'), e)
  }
}

sync(true)
  .then(() => seed())
  .catch(console.log)
