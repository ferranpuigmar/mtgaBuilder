/*
  Warnings:

  - You are about to drop the column `card_id` on the `Card` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Card_card_id_key";

-- AlterTable
ALTER TABLE "public"."Card" DROP COLUMN "card_id";

-- CreateIndex
CREATE UNIQUE INDEX "Card_id_key" ON "public"."Card"("id");
