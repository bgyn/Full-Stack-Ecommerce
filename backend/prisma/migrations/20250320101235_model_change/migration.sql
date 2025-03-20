/*
  Warnings:

  - You are about to drop the column `productId` on the `order_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_productId_fkey";

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "productId";
