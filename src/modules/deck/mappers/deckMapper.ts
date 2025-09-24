import { Card as CardPersistance, Deck as DeckPersistance, DeckCard as DeckCardPersistance } from "@/generated/prisma";
import { Deck } from "../types/deck";

type CardPersistanceWithSelected = CardPersistance & Omit<DeckCardPersistance, 'card_id' | 'deck_id'>;
export type DeckPersistenceWithCards = DeckPersistance & { cards: CardPersistanceWithSelected[] };

export const deckMapperToDomain = (deck: DeckPersistenceWithCards): Deck => {
    return {
        id: deck.id,
        name: deck.name,
        description: deck.description || undefined,
        cards: deck.cards.map(card => ({
            id: card.id,
            name: card.name,
            manaCost: card.mana_cost ?? '',
            maxCopies: card.max_copies,
            selectedCopies: card.selected_copies,
            arenaId: card.arena_id ?? undefined
        }))
    };
}

export const deckMapperToPersistence = (deck: Deck): DeckPersistance => {
    return {
        name: deck.name,
        description: deck.description ?? '',
        id: deck.id.toString()
    };
}