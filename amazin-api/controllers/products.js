const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProductsByDepartment = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      category: {
        departmentId: Number(req.params.departmentId),
      },
      isActive: true,
      price_cents: {
        gte: Number(req.query.min),
        lte: Number(req.query.max),
      },
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

  products.forEach((product) => {
    let totalReviews = 0;
    let totalRating = 0;
    if (!product.reviews.length) {
      product.averageRating = 0;
      return;
    }
    product.reviews.forEach((review) => {
      totalReviews += 1;
      totalRating += review.rating;
    });
    averageRating = totalRating / totalReviews;
    product.averageRating = averageRating;
  });

  const filteredProducts = products.filter((product) => {
    return product.averageRating >= Number(req.query.rating);
  });
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
 
  products.forEach((product) => {
    let totalReviews = 0;
    let totalRating = 0;
    if (!product.reviews.length) {
      product.averageRating = 0;
      return;
    }
    product.reviews.forEach((review) => {
      totalReviews += 1;
      totalRating += review.rating;
    });
    averageRating = totalRating / totalReviews;
    product.averageRating = averageRating;
  });

  const filteredProducts = products.filter((product) => {
    return product.averageRating >= Number(req.query.rating);
  });
  res.json(filteredProducts);
};

const getAllProductsBySearch = async (req, res) => {
  console.log('req.query', req.query);
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: req.query.s,
        mode: 'insensitive',
      },
      isActive: true,
      price_cents: {
        gte: Number(req.query.min),
        lte: Number(req.query.max),
      },
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

  products.forEach((product) => {
    let totalReviews = 0;
    let totalRating = 0;
    if (!product.reviews.length) {
      product.averageRating = 0;
      return;
    }
    product.reviews.forEach((review) => {
      totalReviews += 1;
      totalRating += review.rating;
    });
    averageRating = totalRating / totalReviews;
    product.averageRating = averageRating;
  });

  const filteredProducts = products.filter((product) => {
    return product.averageRating >= Number(req.query.rating);
  });
  res.json(filteredProducts);
};

const getAllProductsByFilter = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      categoryId: Number(req.params.categoryId),
      isActive: true,
      price_cents: {
        gte: Number(req.query.min),
        lte: Number(req.query.max),
      },
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

  products.forEach((product) => {
    let totalReviews = 0;
    let totalRating = 0;
    if (!product.reviews.length) {
      product.averageRating = 0;
      return;
    }
    product.reviews.forEach((review) => {
      totalReviews += 1;
      totalRating += review.rating;
    });
    averageRating = totalRating / totalReviews;
    product.averageRating = averageRating;
  });

  const filteredProducts = products.filter((product) => {
    return product.averageRating >= Number(req.query.rating);
  });

  res.json(filteredProducts);
};

const getAllDealsProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      isOnSale: true,
      isActive: true,
      price_cents: {
        gte: Number(req.query.min),
        lte: Number(req.query.max),
      },
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

  products.forEach((product) => {
    let totalReviews = 0;
    let totalRating = 0;
    if (!product.reviews.length) {
      product.averageRating = 0;
      return;
    }
    product.reviews.forEach((review) => {
      totalReviews += 1;
      totalRating += review.rating;
    });
    averageRating = totalRating / totalReviews;
    product.averageRating = averageRating;
  });

  const filteredProducts = products.filter((product) => {
    return product.averageRating >= Number(req.query.rating);
  });

  res.json(filteredProducts);
};

const getBestSellersProducts = async (req, res) => {
  let products = await prisma.product.findMany({
    where: {
      isActive: true,
      price_cents: {
        gte: Number(req.query.min),
        lte: Number(req.query.max),
      },
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

  products.forEach((product) => {
    let totalReviews = 0;
    let totalRating = 0;
    if (!product.reviews.length) {
      product.averageRating = 0;
      return;
    }
    product.reviews.forEach((review) => {
      totalReviews += 1;
      totalRating += review.rating;
    });
    averageRating = totalRating / totalReviews;
    product.averageRating = averageRating;
  });

  const filteredProducts = products.filter((product) => {
    return product.averageRating >= Number(req.query.rating);
  });

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
