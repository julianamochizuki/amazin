const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateProductIsOnSale() {
  const currentDate = new Date();
  const productsToUpdate = await prisma.product.findMany({
    where: {
      isOnSale: true,
      saleEnd: { lte: currentDate },
    },
  });

  for (const product of productsToUpdate) {
    await prisma.product.update({
      where: { id: product.id },
      data: {
        isOnSale: false,
        discountPercent: 0,
        saleStartDate: null,
        saleEndDate: null,
      },
    });
  }
}

cron.schedule(
  '0 0 * * *',
  async () => {
    try {
      await updateProductIsOnSale();
    } catch (e) {
      console.error('error updating product isOnSale field:', e);
    }
  },
  {
    scheduled: true,
    timezone: 'America/Toronto',
  }
);
