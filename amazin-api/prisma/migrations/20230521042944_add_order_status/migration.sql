-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'DELIVERED', 'IN_TRANSIT');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "Status" TEXT NOT NULL DEFAULT 'PENDING';