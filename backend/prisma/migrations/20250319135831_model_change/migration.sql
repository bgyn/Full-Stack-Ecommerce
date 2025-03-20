-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productVariantId_fkey";

-- AlterTable
ALTER TABLE "product_images" ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
