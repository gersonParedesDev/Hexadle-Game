/*
  Warnings:

  - The `attempts` column on the `GameModel` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GameModel" DROP COLUMN "attempts",
ADD COLUMN     "attempts" TEXT[];
