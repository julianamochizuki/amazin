const bcrypt = require('bcryptjs');
hashedPassword = bcrypt.hashSync('password', 10);

module.exports = [
  {
    name: 'David Kim',
    email: 'david@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '123 Fake Street, Vancouver, Canada',
  },
  {
    name: 'Sarah Park',
    email: 'sarah@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '456 Mock Avenue, Vancouver, Canada',
  },
  {
    name: 'Peter Chen',
    email: 'peter@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '789 Dummy Lane, Kelowna, Canada',
  },
  {
    name: 'Karen Wong',
    email: 'karen@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '321 Dummy Street, Toronto, Canada',
  },
  {
    name: 'James Tan',
    email: 'james@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '654 Mock Avenue, Vancouver, Canada',
  },
  {
    name: 'Linda Zhang',
    email: 'linda@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '987 Fake Lane, Montreal, Canada',
  },
  {
    name: 'Emily Chen',
    email: 'emily@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '456 Dummy Street, Calgary, Canada',
  },
  {
    name: 'Michael Johnson',
    email: 'michael1@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '789 Mock Avenue, Edmonton, Canada',
  },
  {
    name: 'Sarah Davis',
    email: 'sarah2@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '123 Fake Lane, Ottawa, Canada',
  },
  {
    name: 'David Kim',
    email: 'david3@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '987 Mock Street, Toronto, Canada',
  },
  {
    name: 'Karen Lee',
    email: 'karen2@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '321 Dummy Avenue, Vancouver, Canada',
  },
  {
    name: 'Matthew Brown',
    email: 'matthew22@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '654 Fake Lane, Montreal, Canada',
  },
  {
    name: 'Jessica Taylor',
    email: 'jessica2@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '789 Dummy Street, Calgary, Canada',
  },
  {
    name: 'Brian Wilson',
    email: 'brian2@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '123 Mock Avenue, Edmonton, Canada',
  },
  {
    name: 'Samantha Anderson',
    email: 'samantha3@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '456 Fake Lane, Ottawa, Canada',
  },
  {
    name: 'Andrew Nguyen',
    email: 'andrew3@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '987 Dummy Street, Toronto, Canada',
  },
];
