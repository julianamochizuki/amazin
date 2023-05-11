const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  res.json(categories);
};

const getCategoryById = async (req, res) => {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(req.params.categoryId),
    },
    include: {
      products: true,
    },
  });
  if (!category) {
    res.status(404).json("Category not found");
  } else {
    res.json(category);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
};