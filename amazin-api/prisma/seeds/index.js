const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Users = require("./users");
const Departments = require("./departments");
const Categories = require("./categories");
const Products = require("./products");
const Reviews = require("./reviews");

async function main() {
  // await Promise.all(
  //   Users.map(async (user) =>
  //     prisma.user.create({
  //       data: user,
  //     })
  //   )
  // );

  // await Promise.all(
  //   Departments.map(async (department) =>
  //     prisma.department.create({
  //       data: department,
  //     })
  //   )
  // );

  // await Promise.all(
  //   Categories.map(async (category) =>
  //     prisma.category.create({
  //       data: category,
  //     })
  //   )
  // );

  // await Promise.all(
  //   Products.map(async (product) =>
  //     prisma.product.create({
  //       data: product,
  //     })
  //   )
  // );

  await Promise.all(
    Reviews.map(async (review) =>
      prisma.review.create({
        data: review,
      })
    )
  );

}

main()
  .catch((e) => {
    console.error("Error seeding db:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successful db seeding.");
    await prisma.$disconnect();
  });
