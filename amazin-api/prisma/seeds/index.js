const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Admin = require('./admin');
const Users = require('./users');
const Departments = require('./departments');
const Reviews = require('./reviews');

async function main() {
  await Promise.all(
    Admin.map(async (user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  await Promise.all(
    Departments.map(async (department) => {
      const createdDepartment = await prisma.department.create({
        data: {
          name: department.name,
          categories: {
            create: department.categories.map((category) => ({
              name: category.name,
              products: {
                create: category.products.map((product) => ({
                  name: product.name,
                  price_cents: product.price_cents,
                  description: product.description,
                  image: product.image,
                  quantity: product.quantity,
                  userId: product.userId,
                })),
              },
            })),
          },
        },
        include: {
          categories: {
            include: {
              products: true,
            },
          },
        },
      });
    })
  );

  await Promise.all(
    Users.map(async (user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

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
    console.error('Error seeding db:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successful db seeding.');
    await prisma.$disconnect();
  });
