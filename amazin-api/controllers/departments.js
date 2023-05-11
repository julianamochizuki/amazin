const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllDepartments = async (req, res) => {
  const departments = await prisma.department.findMany({
    include: {
      categories: true,
    },
  });
  res.json(departments);
};

const getDepartmentById = async (req, res) => {
  const department = await prisma.department.findUnique({
    where: {
      id: Number(req.params.departmentId),
    },
    include: {
      categories: true,
    },
  });
  if (!department) {
    res.status(404).json("Department not found");
  } else {
    res.json(department);
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
};
