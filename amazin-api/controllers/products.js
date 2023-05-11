const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProductsByCategory = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      categoryId: Number(req.params.categoryId),
    },
    include: {
      reviews: true,
    },
  });
  res.json(products);
}

const getProductById = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(req.params.productId),
    },
    include: {
      reviews: true,
    },
  });
  if (!product) {
    res.status(404).json("Product not found");
  } else {
    res.json(product);
  }
}

const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      ...req.body,
    },
  });
  res.json(product);
}

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
}

const deleteProductById = async (req, res) => {
  const product = await prisma.product.delete({
    where: {
      id: Number(req.params.productId),
    },
  });
  res.json(product);
}

module.exports = {
  getAllProductsByCategory,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};