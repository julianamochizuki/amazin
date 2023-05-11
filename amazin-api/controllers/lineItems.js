const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllLineItems = async (req, res) => {
  const lineItems = await prisma.lineItem.findMany({
    include: {
      product: true,
    },
  });
  res.json(lineItems);
};

const getLineItemById = async (req, res) => {
  const lineItem = await prisma.lineItem.findUnique({
    where: {
      id: Number(req.params.lineItemId),
    },
    include: {
      product: true,
    },
  });
  if (!lineItem) {
    res.status(404).json("LineItem not found");
  } else {
    res.json(lineItem);
  }
};

const createLineItem = async (req, res) => {
  const lineItem = await prisma.lineItem.create({
    data: {
      ...req.body,
    },
  });
  res.json(lineItem);
};

const updateLineItemById = async (req, res) => {
  const lineItem = await prisma.lineItem.update({
    where: {
      id: Number(req.params.lineItemId),
    },
    data: {
      ...req.body,
    },
  });
  res.json(lineItem);
};

const deleteLineItemById = async (req, res) => {
  const lineItem = await prisma.lineItem.delete({
    where: {
      id: Number(req.params.lineItemId),
    },
  });
  res.json(lineItem);
};

module.exports = {
  getAllLineItems,
  getLineItemById,
  createLineItem,
  updateLineItemById,
  deleteLineItemById,
};
