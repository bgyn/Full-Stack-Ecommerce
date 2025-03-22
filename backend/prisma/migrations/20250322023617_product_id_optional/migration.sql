-- AlterTable
ALTER TABLE "product" ALTER COLUMN "sizes" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "sub_category" ALTER COLUMN "productId" DROP NOT NULL;
