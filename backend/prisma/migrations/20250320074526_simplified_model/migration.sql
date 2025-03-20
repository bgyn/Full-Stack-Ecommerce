/*
  Warnings:

  - You are about to drop the `product_variant_color_size_stock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_variant_colors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_variant_sizes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `product_variants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_variant_color_size_stock" DROP CONSTRAINT "product_variant_color_size_stock_productVariantColorId_fkey";

-- DropForeignKey
ALTER TABLE "product_variant_color_size_stock" DROP CONSTRAINT "product_variant_color_size_stock_productVariantSizeId_fkey";

-- DropForeignKey
ALTER TABLE "product_variant_colors" DROP CONSTRAINT "product_variant_colors_produtVariantId_fkey";

-- DropForeignKey
ALTER TABLE "product_variant_sizes" DROP CONSTRAINT "product_variant_sizes_productVariantId_fkey";

-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- DropTable
DROP TABLE "product_variant_color_size_stock";

-- DropTable
DROP TABLE "product_variant_colors";

-- DropTable
DROP TABLE "product_variant_sizes";
