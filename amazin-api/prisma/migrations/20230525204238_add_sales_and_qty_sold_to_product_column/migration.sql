-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountPercent" INTEGER,
ADD COLUMN     "isOnSale" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quantitySold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "saleEndDate" TIMESTAMP(3),
ADD COLUMN     "saleStartDate" TIMESTAMP(3);
