const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      orders: {
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      },
      reviews: {
        include: {
          product: true,
        },
      },
    },
  });
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
    include: {
      orders: {
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      },
      reviews: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!user) {
    res.status(401).json('Unauthorized');
  } else {
    res.json(user);
  }
};

const authenticateUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    res.status(401).json('We cannot find an account with that e-mail address');
  } else {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    passwordMatch
      ? res.json(user)
      : res.status(401).json('Your password is incorrect');
  }
};

const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await prisma.user.create({
    data: {
      ...req.body,
      password: hashedPassword,
    },
  });
  res.json(user);
};

const updateUserById = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await prisma.user.update({
    where: {
      id: Number(req.params.userId),
    },
    data: {
      ...req.body,
      password: hashedPassword,
    },
  });
  res.json(user);
};

const deleteUserById = async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: Number(req.params.userId),
    },
  });
  res.json(user);
};

module.exports = {
  getUserById,
  authenticateUser,
  createUser,
  updateUserById,
  deleteUserById,
  getAllUsers,
};
