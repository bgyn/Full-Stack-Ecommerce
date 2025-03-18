/*
  Warnings:

  - You are about to drop the column `productId` on the `product_images` table. All the data in the column will be lost.
  - Made the column `productVariantId` on table `product_images` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productId_fkey";

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "productId",
ALTER COLUMN "productVariantId" SET NOT NULL;
