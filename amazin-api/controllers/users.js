const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      isSeller: true,
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
    res.status(401).json({
      error: 'email_not_found',
      message: 'We cannot find an account with that e-mail address',
    });
  } else {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (passwordMatch) {
      const expiresIn = new Date();
      expiresIn.setDate(expiresIn.getDate() + 1);
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        isSeller: user.isSeller,
        expiresAt: expiresIn,
      };
      const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });
      res.json(token);
    } else {
      res.status(401).json({
        error: 'incorrect_password',
        message: 'Your password is incorrect',
      });
    }
  }
};

const createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const existingUser = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (existingUser) {
    res.status(401).json({
      error: 'email_already_exists',
      message: 'An account with that e-mail address already exists',
    });
  } else {
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });
    res.json(user);
  }
};

const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;

  const updateUser = async () => {
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        ...req.body,
      },
    });

    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 1);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      isSeller: user.isSeller,
      expiresAt: expiresIn,
    };

    const updatedToken = jwt.sign(payload, secretKey, { expiresIn: '1d' });
    res.json(updatedToken);
  };

  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser && existingUser.id !== Number(userId)) {
      res.status(401).json({
        error: 'email_already_exists',
        message: 'An account with that e-mail address already exists',
      });
    } else {
      await updateUser();
    }
  } else {
    await updateUser();
  }
};

const updatePasswordById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.userId),
    },
  });
  const passwordMatch = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!passwordMatch) {
    res.status(401).json('Your password is incorrect');
  } else {
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.userId),
      },
      data: {
        password: hashedPassword,
      },
    });
    res.status(200).json('Your password has been updated');
  }
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
  updatePasswordById,
  deleteUserById,
};
