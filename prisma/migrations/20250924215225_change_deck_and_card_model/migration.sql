/*
  Warnings:

  - The primary key for the `DeckCard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cardId` on the `DeckCard` table. All the data in the column will be lost.
  - You are about to drop the column `deckId` on the `DeckCard` table. All the data in the column will be lost.
  - Added the required column `card_id` to the `DeckCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deck_id` to the `DeckCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."DeckCard" DROP CONSTRAINT "DeckCard_cardId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DeckCard" DROP CONSTRAINT "DeckCard_deckId_fkey";

-- DropIndex
DROP INDEX "public"."DeckCard_cardId_idx";

-- DropIndex
DROP INDEX "public"."DeckCard_deckId_idx";

-- AlterTable
ALTER TABLE "public"."DeckCard" DROP CONSTRAINT "DeckCard_pkey",
DROP COLUMN "cardId",
DROP COLUMN "deckId",
ADD COLUMN     "card_id" TEXT NOT NULL,
ADD COLUMN     "deck_id" TEXT NOT NULL,
ADD CONSTRAINT "DeckCard_pkey" PRIMARY KEY ("deck_id", "card_id");

-- CreateIndex
CREATE INDEX "DeckCard_card_id_idx" ON "public"."DeckCard"("card_id");

-- CreateIndex
CREATE INDEX "DeckCard_deck_id_idx" ON "public"."DeckCard"("deck_id");

-- AddForeignKey
ALTER TABLE "public"."DeckCard" ADD CONSTRAINT "DeckCard_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeckCard" ADD CONSTRAINT "DeckCard_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "public"."Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
