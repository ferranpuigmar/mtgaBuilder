/*
  Warnings:

  - A unique constraint covering the columns `[arenaId]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Card" ADD COLUMN     "arenaId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Card_arenaId_key" ON "public"."Card"("arenaId");
