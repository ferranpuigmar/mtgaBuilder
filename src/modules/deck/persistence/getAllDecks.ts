import prisma from '@/infra/bdClient/bdClient';
import { Deck } from "../types/deck";
import { deckMapperToDomain } from '../mappers/deckMapper';

export const getAllDecks = async (): Promise<Deck[]> => {
  const decks = await prisma.deck.findMany({
    include: {
      cards: {
        select: { selected_copies: true, card: true },
      },
    }
  });

  return decks.map(deck => {
    const flatDeck = {
      ...deck,
      cards: deck.cards.map(cardWithSelected => ({
        ...cardWithSelected.card,
        selected_copies: cardWithSelected.selected_copies,
        deckId: deck.id,
        cardId: cardWithSelected.card.id
      }))
    };
    return deckMapperToDomain(flatDeck);
  });
}