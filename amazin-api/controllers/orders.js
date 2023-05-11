const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrdersByUserId = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: Number(req.params.userId),
    },
    include: {
      lineItems: {
        include: {
          product: true,
        },
      },
    },
  });
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await prisma.order.findUnique({
    where: {
      id: Number(req.params.orderId),
    },
    include: {
      lineItems: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!order) {
    res.status(404).json("Order not found");
  } else {
    res.json(order);
  }
};

const createOrder = async (req, res) => {
  const order = await prisma.order.create({
    data: {
      ...req.body,
    },
  });
  res.json(order);
};

module.exports = {
  getAllOrdersByUserId,
  getOrderById,
  createOrder,
};
