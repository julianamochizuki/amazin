const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    res.status(401).json("Unauthorized");
  } else {
    res.json(user);
  }
};

const getUserIdByEmail = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
    select: { id: true },
  });
  if (!user) {
    res.status(401).json("Unauthorized");
  } else {
    res.json(user);
  }
};

const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.json(user);
};

const updateUserById = async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: Number(req.params.userId),
    },
    data: {
      ...req.body,
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
  getUserIdByEmail,
  createUser,
  updateUserById,
  deleteUserById,
  getAllUsers,
};
