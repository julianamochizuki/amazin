/*
  Warnings:

  - You are about to drop the column `Status` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "Status";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "address" DROP NOT NULL;

-- DropEnum
DROP TYPE "Status";
