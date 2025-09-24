/*
  Warnings:

  - The primary key for the `Deck` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Card" DROP CONSTRAINT "Card_deckId_fkey";

-- AlterTable
ALTER TABLE "public"."Card" ALTER COLUMN "deckId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Deck" DROP CONSTRAINT "Deck_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Deck_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Deck_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "public"."Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
