/*
  Warnings:

  - The `order_status` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "order" DROP COLUMN "order_status",
ADD COLUMN     "order_status" "OrderStatus" NOT NULL DEFAULT 'PENDING';
