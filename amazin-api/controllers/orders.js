const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllOrdersByUserId = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: Number(req.params.userId),
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              reviews: true,
              OrderItem: {
                select: {
                  Order: {
                    select: {
                      userId: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  res.json(orders);
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
  createOrder,
};
