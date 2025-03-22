/*
  Warnings:

  - You are about to drop the `_ProductCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subCategoryId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductCategories" DROP CONSTRAINT "_ProductCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductCategories" DROP CONSTRAINT "_ProductCategories_B_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "subCategoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProductCategories";

-- CreateTable
CREATE TABLE "sub_category" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "sub_category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sub_category_sub_category_name_key" ON "sub_category"("sub_category_name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_category" ADD CONSTRAINT "sub_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
