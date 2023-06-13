const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const { getFilteredProducts } = require('../helpers/products');

const getAllProductsByDepartment = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      category: {
        departmentId: Number(req.params.departmentId),
      },
      isActive: true,
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

  const filteredProducts = getFilteredProducts(products, req);

  res.json(filteredProducts);
};

const getAllProductsByCategory = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      categoryId: Number(req.params.categoryId),
      isActive: true,
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

  const filteredProducts = getFilteredProducts(products, req);

  res.json(filteredProducts);
};

const getAllProductsBySearch = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: req.query.s,
        mode: 'insensitive',
      },
      isActive: true,
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

  const filteredProducts = getFilteredProducts(products, req);

  res.json(filteredProducts);
};

const getAllProductsByFilter = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      categoryId: Number(req.params.categoryId),
      isActive: true,
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

  const filteredProducts = getFilteredProducts(products, req);

  res.json(filteredProducts);
};

const getAllDealsProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      isOnSale: true,
      isActive: true,
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

  const filteredProducts = getFilteredProducts(products, req);

  res.json(filteredProducts);
};

const getBestSellersProducts = async (req, res) => {
  let products = await prisma.product.findMany({
    where: {
      isActive: true,
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
    orderBy: {
      quantitySold: 'desc',
    },
  });

  products = products.slice(0, 20);

  const filteredProducts = getFilteredProducts(products, req);

  res.json(filteredProducts);
};

const getProductById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(req.params.productId),
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
      OrderItem: {
        select: {
          Order: {
            select: {
              userId: true,
            },
          },
        },
      },
      User: {
        select: {
          name: true,
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
  getAllProductsByDepartment,
  getAllProductsByCategory,
  getAllProductsBySearch,
  getAllProductsByFilter,
  getAllDealsProducts,
  getBestSellersProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
