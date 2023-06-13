const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllSellerProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      userId: Number(req.params.sellerId),
    },
    include: {
      OrderItem: {
        select: {
          quantity: true,
          createdAt: true,
          Order: {
            select: {
              id: true,
              createdAt: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      reviews: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          Department: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  res.json(products);
};

const getAllSellerOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: {
      orderItems: {
        some: {
          product: {
            userId: Number(req.params.sellerId),
          },
        },
      },
    },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
      orderItems: {
        select: {
          id: true,
          quantity: true,
          createdAt: true,
          product: true,
        },
        where: {
          product: {
            userId: Number(req.params.sellerId),
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

const getProductById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(req.params.productId),
      userId: Number(req.params.sellerId),
    },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  if (!product) {
    res.status(404).json('Product not found');
  } else {
    res.json(product);
  }
};

const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      ...req.body,
    },
  });
  res.json(product);
};

const updateProductById = async (req, res) => {
  const product = await prisma.product.update({
    where: {
      id: Number(req.params.productId),
    },
    data: {
      ...req.body,
    },
  });
  res.json(product);
};

const deleteProductById = async (req, res) => {
  const product = await prisma.product.delete({
    where: {
      id: Number(req.params.productId),
    },
  });
  res.json(product);
};

module.exports = {
  getAllSellerProducts,
  getAllSellerOrders,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
