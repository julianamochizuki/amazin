const bcrypt = require('bcryptjs');
hashedPassword = bcrypt.hashSync('password', 10);

module.exports = [
  {
    name: 'Amazin Store',
    email: 'amazin@store.com',
    password: hashedPassword,
    address: '123 Retail Street, Toronto, Canada',
    isSeller: true,
  },
  {
    name: 'TopSellerz',
    email: 'topsellerz@store.com',
    password: hashedPassword,
    address: '456 Market Avenue, Vancouver, Canada',
    isSeller: true,
  },
  {
    name: 'AmazeShop',
    email: 'amazeshop@store.com',
    password: hashedPassword,
    address: '789 Commercial Lane, Montreal, Canada',
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
