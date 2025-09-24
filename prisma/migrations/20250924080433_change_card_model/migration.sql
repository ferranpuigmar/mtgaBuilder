/*
  Warnings:

  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `arenaId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `deckId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `manaCost` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `maxCopies` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `selectedCopies` on the `Card` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[card_id]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[arena_id]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `card_id` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mana_cost` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_copies` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Card" DROP CONSTRAINT "Card_deckId_fkey";

-- DropIndex
DROP INDEX "public"."Card_arenaId_key";

-- DropIndex
DROP INDEX "public"."Card_cardId_key";

-- AlterTable
ALTER TABLE "public"."Card" DROP CONSTRAINT "Card_pkey",
DROP COLUMN "arenaId",
DROP COLUMN "cardId",
DROP COLUMN "deckId",
DROP COLUMN "manaCost",
DROP COLUMN "maxCopies",
DROP COLUMN "selectedCopies",
ADD COLUMN     "arena_id" INTEGER,
ADD COLUMN     "card_id" TEXT NOT NULL,
ADD COLUMN     "deck_id" TEXT,
ADD COLUMN     "mana_cost" TEXT NOT NULL,
ADD COLUMN     "max_copies" INTEGER NOT NULL,
ADD COLUMN     "selected_copies" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Card_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Card_card_id_key" ON "public"."Card"("card_id");

-- CreateIndex
CREATE UNIQUE INDEX "Card_arena_id_key" ON "public"."Card"("arena_id");

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
