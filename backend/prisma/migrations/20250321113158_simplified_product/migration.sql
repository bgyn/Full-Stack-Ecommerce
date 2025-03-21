/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `cart_item` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `order_item` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the `product_variants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `order_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productID` to the `product_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_productId_fkey";

-- AlterTable
ALTER TABLE "cart_item" DROP COLUMN "productVariantId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_item" DROP COLUMN "productVariantId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "productVariantId",
ADD COLUMN     "productID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "product_variants";

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productID_fkey" FOREIGN KEY ("productID") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
