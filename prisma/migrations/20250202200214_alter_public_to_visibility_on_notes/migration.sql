/*
  Warnings:

  - You are about to drop the column `public` on the `Note` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVADO', 'READ_ONLY');

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "public",
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PRIVADO';
