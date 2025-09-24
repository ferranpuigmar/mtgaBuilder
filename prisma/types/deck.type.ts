import { Card, Deck } from "@/generated/prisma";

export type DeckWithCards = Deck & { cards: Card[] };