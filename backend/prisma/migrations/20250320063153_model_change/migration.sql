/*
  Warnings:

  - You are about to drop the column `color` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `product_variants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "color",
DROP COLUMN "size",
DROP COLUMN "stock";

-- CreateTable
CREATE TABLE "product_variant_colors" (
    "id" SERIAL NOT NULL,
    "produtVariantId" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "hexCode" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_variant_colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant_sizes" (
    "id" SERIAL NOT NULL,
    "productVariantId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_variant_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant_color_size_stock" (
    "id" SERIAL NOT NULL,
    "productVariantColorId" INTEGER NOT NULL,
    "productVariantSizeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_variant_color_size_stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_variant_colors" ADD CONSTRAINT "product_variant_colors_produtVariantId_fkey" FOREIGN KEY ("produtVariantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_sizes" ADD CONSTRAINT "product_variant_sizes_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_color_size_stock" ADD CONSTRAINT "product_variant_color_size_stock_productVariantColorId_fkey" FOREIGN KEY ("productVariantColorId") REFERENCES "product_variant_colors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_color_size_stock" ADD CONSTRAINT "product_variant_color_size_stock_productVariantSizeId_fkey" FOREIGN KEY ("productVariantSizeId") REFERENCES "product_variant_sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
