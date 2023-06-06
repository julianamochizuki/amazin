const bcrypt = require('bcryptjs');
hashedPassword = bcrypt.hashSync('password', 10);

module.exports = [
  {
    name: 'Shop Smart',
    email: 'shopsmart@store.com',
    password: hashedPassword,
    address: '456 Market Avenue, Vancouver, Canada',
    isSeller: true,
  },
  {
    name: 'PrimeGoods',
    email: 'primegoods@store.com',
    password: hashedPassword,
    address: '987 Retail Street, Calgary, Canada',
    isSeller: true,
  },
];
