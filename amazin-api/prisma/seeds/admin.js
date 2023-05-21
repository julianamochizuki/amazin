const bcrypt = require('bcryptjs');
hashedPassword = bcrypt.hashSync('password', 10);

module.exports = [
  {
    name: 'Amazin Store',
    email: 'amazin@store.com',
    password: hashedPassword,
    address: '123 Retail Street, Toronto, Canada',
  },
  {
    name: 'TopSellerz',
    email: 'john@store.com',
    password: hashedPassword,
    address: '456 Market Avenue, Vancouver, Canada',
  },
  {
    name: 'AmazeShop',
    email: 'michael@store.com',
    password: hashedPassword,
    address: '789 Commercial Lane, Montreal, Canada',
  },
  {
    name: 'PrimeGoods',
    email: 'samantha@store.com',
    password: hashedPassword,
    address: '987 Retail Street, Calgary, Canada',
  },
];
