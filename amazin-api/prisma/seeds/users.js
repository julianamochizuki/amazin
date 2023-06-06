const bcrypt = require('bcryptjs');
hashedPassword = bcrypt.hashSync('password', 10);

module.exports = [
  {
    name: 'Peter Chen',
    email: 'peter@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '789 Dummy Lane, Kelowna, Canada',
  },
  {
    name: 'Michael Johnson',
    email: 'michael1@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '789 Mock Avenue, Edmonton, Canada',
  },
  {
    name: 'Jessica Taylor',
    email: 'jessica2@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '789 Dummy Street, Calgary, Canada',
  },
  {
    name: 'Samantha Anderson',
    email: 'samantha3@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '456 Fake Lane, Ottawa, Canada',
  },
  {
    name: 'Anna Wilson',
    email: 'anna@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '987 Dummy Street, Toronto, Canada',
  },
];
