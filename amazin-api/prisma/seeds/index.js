const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Sellers = require('./sellers');
const Users = require('./users');
const Departments = require('./products');
const Orders = require('./orders');
const Reviews = require('./reviews');

async function createProducts() {
  await Promise.all(
    Departments.map(async (department) => {
      await prisma.department.create({
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
                  quantitySold: product.quantitySold,
                  isOnSale: product.isOnSale,
                  discountPercent: product.discountPercent,
                  saleStartDate: product.salesStartDate,
                  saleEndDate: product.salesEndDate,
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
}

async function createOrders() {
  const getTotal = async (orderItems) => {
    let total = 0;
    for (const orderItem of orderItems) {
      const product = await prisma.product.findUnique({
        where: {
          id: Number(orderItem.productId),
        },
      });
      if (product) {
        total += product.price_cents * orderItem.quantity;
      } else {
        total += 0;
        console.error(`Product not found for id: ${orderItem.productId}`);
      }
    }
    return total;
  };

  await Promise.all(
    Orders.map(async (order) =>
      prisma.order.create({
        data: order,
      })
    )
  );

  const orders = await prisma.order.findMany({
    include: {
      orderItems: true,
    },
  });

  for (const order of orders) {
    const total = await getTotal(order.orderItems);
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        total: total,
      },
    });
  }
}

async function main() {
  const AmazinStore = {
    name: 'Amazin Store',
    email: 'amazin@store.com',
    password: hashedPassword,
    address: '123 Retail Street, Toronto, Canada',
    isSeller: true,
  };

  const DemoSeller = {
    name: 'TopSellerz',
    email: 'topsellerz@store.com',
    password: hashedPassword,
    address: '456 Market Avenue, Vancouver, Canada',
    isSeller: true,
  };

  const DemoUser = {
    name: 'Sarah Smith',
    email: 'sarahs@email.com',
    password: hashedPassword,
    isSeller: false,
    address: '123 Fake Street, Vancouver, Canada',
  };

  await prisma.user.create({
    data: AmazinStore,
  });

  await prisma.user.create({
    data: DemoSeller,
  });

  await prisma.user.create({
    data: DemoUser,
  });

  await Promise.all(
    Sellers.map(async (user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  await createProducts();

  await Promise.all(
    Users.map(async (user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  await createOrders();

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
