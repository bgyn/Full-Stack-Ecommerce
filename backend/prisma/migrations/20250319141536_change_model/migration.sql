/*
  Warnings:

  - You are about to drop the column `productId` on the `product_images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productId_fkey";

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
