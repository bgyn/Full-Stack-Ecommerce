/*
  Warnings:

  - Added the required column `category_image` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "category_image" TEXT NOT NULL;
