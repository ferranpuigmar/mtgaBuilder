/*
  Warnings:

  - You are about to drop the column `deck_id` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `selected_copies` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Card" DROP CONSTRAINT "Card_deck_id_fkey";

-- DropIndex
DROP INDEX "public"."Card_id_key";

-- AlterTable
ALTER TABLE "public"."Card" DROP COLUMN "deck_id",
DROP COLUMN "selected_copies",
ALTER COLUMN "mana_cost" DROP NOT NULL,
ALTER COLUMN "max_copies" SET DEFAULT 4;

-- AlterTable
ALTER TABLE "public"."Deck" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."DeckCard" (
    "deckId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "selected_copies" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "DeckCard_pkey" PRIMARY KEY ("deckId","cardId")
);

-- CreateIndex
CREATE INDEX "DeckCard_cardId_idx" ON "public"."DeckCard"("cardId");

-- CreateIndex
CREATE INDEX "DeckCard_deckId_idx" ON "public"."DeckCard"("deckId");

-- AddForeignKey
ALTER TABLE "public"."DeckCard" ADD CONSTRAINT "DeckCard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DeckCard" ADD CONSTRAINT "DeckCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "public"."Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
