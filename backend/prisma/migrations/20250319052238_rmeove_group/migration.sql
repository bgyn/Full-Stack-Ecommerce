/*
  Warnings:

  - You are about to drop the `_CategoryGroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryGroups" DROP CONSTRAINT "_CategoryGroups_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryGroups" DROP CONSTRAINT "_CategoryGroups_B_fkey";

-- DropTable
DROP TABLE "_CategoryGroups";

-- DropTable
DROP TABLE "group";
