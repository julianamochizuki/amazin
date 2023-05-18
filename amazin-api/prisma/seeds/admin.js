const bcrypt = require('bcryptjs');
hashedPassword = bcrypt.hashSync('password', 10);

module.exports = [
  {
    name: 'Amazin Store',
    email: 'amazin@email.com',
    password: hashedPassword,
  },

  {
    name: 'TopSellerz',
    email: 'john@email.com',
    password: hashedPassword,
  },
  {
    name: 'AmazeShop',
    email: 'michael@email.com',
    password: hashedPassword,
  },
  {
    name: 'PrimeGoods',
    email: 'samantha@email.com',
    password: hashedPassword,
  },
];
